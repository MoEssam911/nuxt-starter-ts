import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type LocaleCode,
  type LocaleDefinition,
  type LocaleDirection,
} from './locales';

type I18nModuleConfig = {
  defaultDirection: LocaleDirection;
  defaultLocale: LocaleCode;
  detectBrowserLanguage: false;
  locales: Array<LocaleDefinition & { file: string }>;
  strategy: 'prefix';
};

export const createI18nModuleConfig = (): I18nModuleConfig => ({
  defaultDirection: 'ltr',
  defaultLocale: DEFAULT_LOCALE,
  detectBrowserLanguage: false,
  locales: SUPPORTED_LOCALES.map((locale) => ({
    ...locale,
    file: `${locale.code}.json`,
  })),
  strategy: 'prefix',
});
