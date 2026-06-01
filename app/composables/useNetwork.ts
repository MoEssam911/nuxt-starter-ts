/**
 * Reactive network online/offline status.
 * SSR-safe: defaults to `true` on the server.
 *
 * @example
 * const { isOnline } = useNetwork()
 * watchEffect(() => {
 *   if (!isOnline.value) toast.warning('You are offline')
 * })
 */
export const useNetwork = () => {
  const isOnline = ref(import.meta.client ? navigator.onLine : true);

  if (import.meta.client) {
    const handleOnline = () => {
      isOnline.value = true;
    };
    const handleOffline = () => {
      isOnline.value = false;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    onUnmounted(() => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    });
  }

  return { isOnline: readonly(isOnline) };
};
