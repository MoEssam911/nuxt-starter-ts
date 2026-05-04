import { generateId } from '~/core/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'neutral';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

export interface ToastInput {
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
}

const TOASTS_KEY = 'starter-toasts';
const DEFAULT_DURATION = 4500;

export const useToast = () => {
  const toasts = useState<ToastItem[]>(TOASTS_KEY, () => []);

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const clear = () => {
    toasts.value = [];
  };

  const push = (input: ToastInput) => {
    const toast: ToastItem = {
      id: generateId(),
      type: input.type ?? 'neutral',
      title: input.title,
      message: input.message,
      duration: input.duration ?? DEFAULT_DURATION,
    };

    toasts.value.push(toast);
    return toast.id;
  };

  const success = (title: string, message?: string, duration?: number) =>
    push({ type: 'success', title, message, duration });
  const error = (title: string, message?: string, duration?: number) =>
    push({ type: 'error', title, message, duration });
  const info = (title: string, message?: string, duration?: number) =>
    push({ type: 'info', title, message, duration });
  const warning = (title: string, message?: string, duration?: number) =>
    push({ type: 'warning', title, message, duration });

  return {
    toasts,
    push,
    remove,
    clear,
    success,
    error,
    info,
    warning,
  };
};
