import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../i18n/locales';

export const useSupportedLocales = () => {
  const { locale, locales, t } = useI18n();

  const isActiveLocale = (code: string) => locale.value === code;

  return {
    defaultLocale: DEFAULT_LOCALE,
    locale,
    locales: locales.value.length ? locales.value : SUPPORTED_LOCALES,
    supportedLocales: SUPPORTED_LOCALES,
    t,
    isActiveLocale,
  };
};
