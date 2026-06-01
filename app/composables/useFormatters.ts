import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const useFormatters = () => {
  const formatDate = (date: string | Date, format = 'DD MMM YYYY') => {
    return dayjs(date).format(format);
  };

  const formatDateTime = (date: string | Date) => {
    return dayjs(date).format('DD MMM YYYY HH:mm');
  };

  const formatRelative = (date: string | Date) => {
    return dayjs(date).fromNow();
  };

  // NOTE: if your project stores prices in piastres (×100), divide by 100 before passing to this function
  const formatCurrency = (amount: number, currency = 'EGP', locale = 'en') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatNumber = (n: number, locale = 'en') => {
    return new Intl.NumberFormat(locale).format(n);
  };

  return {
    formatDate,
    formatDateTime,
    formatRelative,
    formatCurrency,
    formatNumber,
  };
};
