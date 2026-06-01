export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'neutral';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

const TOASTS_KEY = 'starter-toasts';
const DEFAULT_DURATION = 4500;

export const useToast = () => {
  const toasts = useState<ToastItem[]>(TOASTS_KEY, () => []);

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const clear = () => {
    toasts.value = [];
  };

  const push = (input: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    toasts.value.push({ ...input, id });
    return id;
  };

  const success = (title: string, message?: string, duration?: number) =>
    push({ type: 'success', title, message, duration: duration ?? DEFAULT_DURATION });

  const error = (title: string, message?: string, duration?: number) =>
    push({ type: 'error', title, message, duration: duration ?? DEFAULT_DURATION });

  const info = (title: string, message?: string, duration?: number) =>
    push({ type: 'info', title, message, duration: duration ?? DEFAULT_DURATION });

  const warning = (title: string, message?: string, duration?: number) =>
    push({ type: 'warning', title, message, duration: duration ?? DEFAULT_DURATION });

  return { toasts, push, remove, clear, success, error, info, warning };
};
