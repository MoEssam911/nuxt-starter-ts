import { useAuthStore } from '~/modules/auth/stores/auth.store';

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  const token = useCookie<string | null>('token');

  // Sync token from cookie → store
  if (token.value && !auth.token) {
    auth.token = token.value;
  }
});
