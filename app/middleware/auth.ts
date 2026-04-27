import { useAuthStore } from '~/modules/auth/stores/auth.store';

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    return navigateTo('/login');
  }
});
