import { describe, expect, it } from 'vitest';

import {
  buildLocaleMessages,
  collectLocaleFiles,
  mergeLocaleMessages,
} from '../../app/core/i18n/locale-messages';

describe('mergeLocaleMessages', () => {
  it('deep-merges nested objects', () => {
    const target = { common: { save: 'Save', cancel: 'Cancel' } };
    const source = { common: { save: 'Guardar' }, navigation: { home: 'Home' } };

    const result = mergeLocaleMessages(target, source);

    expect(result).toEqual({
      common: { save: 'Guardar', cancel: 'Cancel' },
      navigation: { home: 'Home' },
    });
  });

  it('lets later sources override leaf values', () => {
    const target = { example: { title: 'Root title' } };
    const source = { example: { title: 'Module title' } };

    const result = mergeLocaleMessages(target, source);

    expect(result.example).toEqual({ title: 'Module title' });
  });
});

describe('collectLocaleFiles', () => {
  it('registers shared locales before module locales', () => {
    const filesByLocale = collectLocaleFiles();
    const enFiles = filesByLocale.get('en') ?? [];

    expect(enFiles.length).toBeGreaterThanOrEqual(2);

    const sharedIndex = enFiles.findIndex((filePath) => /locales[\\/]en\.json$/.test(filePath));
    const moduleIndex = enFiles.findIndex((filePath) =>
      /modules[\\/]example[\\/]locales[\\/]en\.json$/.test(filePath),
    );

    expect(sharedIndex).toBeGreaterThanOrEqual(0);
    expect(moduleIndex).toBeGreaterThan(sharedIndex);
  });
});

describe('buildLocaleMessages', () => {
  it('includes merged shared and module messages', () => {
    const messages = buildLocaleMessages();

    expect(messages.en.common?.appName).toBe('Nuxt Starter');
    expect(messages.en.example?.title).toBe('Example module');
    expect(messages.ar.example?.title).toBe('الوحدة التجريبية');
  });
});
