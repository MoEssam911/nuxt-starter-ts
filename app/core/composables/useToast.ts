export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

const TOAST_DEFAULTS = {
  duration: 5000,
};

/**
 * Global toast notification composable.
 *
 * @example
 * ```ts
 * const toast = useToast()
 * toast.success('User created!')
 * toast.error('Something went wrong')
 * toast.info('Heads up...')
 * toast.warning('Be careful!')
 * ```
 */
export const useToast = () => {
  const toasts = useState<Toast[]>('global-toasts', () => []);

  const add = (type: ToastType, message: string, duration = TOAST_DEFAULTS.duration) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    toasts.value.push({ id, type, message, duration });
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const success = (message: string, duration?: number) => add('success', message, duration);
  const error = (message: string, duration?: number) => add('error', message, duration);
  const info = (message: string, duration?: number) => add('info', message, duration);
  const warning = (message: string, duration?: number) => add('warning', message, duration);

  return {
    /** Readonly reactive array of active toasts. */
    toasts: readonly(toasts),
    add,
    remove,
    success,
    error,
    info,
    warning,
  };
};
