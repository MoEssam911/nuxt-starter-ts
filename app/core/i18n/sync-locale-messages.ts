import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { buildLocaleMessages } from './locale-messages';

const GENERATED_LOCALES_DIR = resolve(process.cwd(), 'i18n', 'locales');

export const syncLocaleMessages = () => {
  const messages = buildLocaleMessages();

  mkdirSync(GENERATED_LOCALES_DIR, { recursive: true });

  for (const [localeCode, localeMessages] of Object.entries(messages)) {
    writeFileSync(
      resolve(GENERATED_LOCALES_DIR, `${localeCode}.json`),
      `${JSON.stringify(localeMessages, null, 2)}\n`,
    );
  }
};
