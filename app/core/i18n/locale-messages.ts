import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { SUPPORTED_LOCALES, type LocaleCode } from './locales';

export type LocaleMessages = Record<string, unknown>;

const LOCALE_CODES = SUPPORTED_LOCALES.map((locale) => locale.code);

const isLocaleCode = (value: string): value is LocaleCode =>
  LOCALE_CODES.includes(value as LocaleCode);

const isJsonFile = (fileName: string) => fileName.endsWith('.json');

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const mergeLocaleMessages = (
  target: LocaleMessages,
  source: LocaleMessages,
): LocaleMessages => {
  for (const [key, value] of Object.entries(source)) {
    const currentValue = target[key];

    if (isPlainObject(currentValue) && isPlainObject(value)) {
      target[key] = mergeLocaleMessages({ ...currentValue }, value);
      continue;
    }

    target[key] = value;
  }

  return target;
};

const readLocaleMessages = (filePath: string): LocaleMessages => {
  const fileContent = readFileSync(filePath, 'utf8');

  try {
    const parsed = JSON.parse(fileContent) as LocaleMessages;

    if (!isPlainObject(parsed)) {
      throw new Error('Locale file must export a JSON object.');
    }

    return parsed;
  } catch (error) {
    throw new Error(
      `Failed to parse locale file ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const collectLocaleFiles = () => {
  const projectRoot = process.cwd();
  const sharedLocalesDir = resolve(projectRoot, 'locales');
  const modulesDir = resolve(projectRoot, 'app', 'modules');

  const filesByLocale = new Map<LocaleCode, string[]>();

  for (const localeCode of LOCALE_CODES) {
    filesByLocale.set(localeCode, []);
  }

  const registerLocaleFile = (filePath: string) => {
    const fileName = filePath.split(/[\\/]/).pop();

    if (!fileName || !isJsonFile(fileName)) return;

    const localeCode = fileName.replace('.json', '');

    if (!isLocaleCode(localeCode)) return;

    filesByLocale.get(localeCode)?.push(filePath);
  };

  const scanLocaleDirectory = (directoryPath: string) => {
    if (!existsSync(directoryPath)) return;

    for (const entry of readdirSync(directoryPath).sort()) {
      const entryPath = resolve(directoryPath, entry);

      if (statSync(entryPath).isDirectory()) {
        continue;
      }

      registerLocaleFile(entryPath);
    }
  };

  scanLocaleDirectory(sharedLocalesDir);

  if (existsSync(modulesDir)) {
    for (const moduleName of readdirSync(modulesDir).sort()) {
      const modulePath = resolve(modulesDir, moduleName);

      if (!statSync(modulePath).isDirectory()) continue;

      scanLocaleDirectory(resolve(modulePath, 'locales'));
    }
  }

  return filesByLocale;
};

export const buildLocaleMessages = () => {
  const filesByLocale = collectLocaleFiles();
  const messages = {} as Record<LocaleCode, LocaleMessages>;

  for (const localeCode of LOCALE_CODES) {
    const localeMessages: LocaleMessages = {};

    for (const filePath of filesByLocale.get(localeCode) ?? []) {
      mergeLocaleMessages(localeMessages, readLocaleMessages(filePath));
    }

    messages[localeCode] = localeMessages;
  }

  return messages;
};
