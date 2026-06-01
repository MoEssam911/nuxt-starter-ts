export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const roles = to.meta.roles as string[] | undefined;

  if (!roles || roles.length === 0) return;

  if (!authStore.user || !roles.includes(authStore.user.role)) {
    return navigateTo((to.meta.fallback as string | undefined) ?? '/');
  }
});
