interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const state = ref<ConfirmState>({
  isOpen: false,
  title: '',
  message: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'info',
  onConfirm: () => {},
  onCancel: () => {},
});

/**
 * Headless confirmation dialog composable.
 * Pair with a `<ConfirmDialog>` component that reads this state.
 *
 * @example
 * const confirm = useConfirm()
 * try {
 *   await confirm.ask({ title: 'Delete item', message: 'This cannot be undone.', variant: 'danger' })
 *   await deleteItem(id) // only runs if user confirms
 * } catch {
 *   // user cancelled — do nothing
 * }
 */
export const useConfirm = () => {
  const ask = (options: ConfirmOptions): Promise<void> => {
    return new Promise((resolve, reject) => {
      state.value = {
        ...options,
        confirmLabel: options.confirmLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        variant: options.variant ?? 'info',
        isOpen: true,
        onConfirm: () => {
          state.value.isOpen = false;
          resolve();
        },
        onCancel: () => {
          state.value.isOpen = false;
          reject(new Error('User cancelled'));
        },
      };
    });
  };

  return { state: readonly(state), ask };
};
