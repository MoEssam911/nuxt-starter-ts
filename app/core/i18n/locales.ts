export type LocaleCode = 'en' | 'ar';

export type LocaleDirection = 'ltr' | 'rtl';

export type LocaleDefinition = {
  code: LocaleCode;
  language: string;
  name: string;
  dir: LocaleDirection;
};

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const SUPPORTED_LOCALES: LocaleDefinition[] = [
  {
    code: 'en',
    language: 'en-US',
    name: 'English',
    dir: 'ltr',
  },
  {
    code: 'ar',
    language: 'ar',
    name: 'Arabic',
    dir: 'rtl',
  },
];
