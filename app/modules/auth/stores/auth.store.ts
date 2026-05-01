import { defineStore } from 'pinia';

import { useApiClient, normalizeError } from '~/core/api/client';
import { getAuthConfig } from '~/core/config/auth';
import { logError } from '~/core/utils/error-logger';

export const useAuthStore = defineStore('auth', () => {
  const authConfig = getAuthConfig();
  const token = useCookie<string | null>(authConfig.cookieName || 'token');
  const user = ref<any | null>(null);
  const isAuthenticated = computed(() => Boolean(token.value));

  const login = async (credentials: Record<string, any>) => {
    const client = useApiClient();
    const toast = useToast();

    try {
      const response = await client(authConfig.endpoints.login, {
        method: 'POST',
        body: credentials,
      });

      // Generic: expect projects to return { token, user } or similar; store what exists
      token.value = (response as any)?.token ?? token.value;
      user.value = (response as any)?.user ?? (response as any)?.data ?? user.value;
      toast?.success?.('Login successful!');
      return response;
    } catch (e: unknown) {
      const error = normalizeError(e);
      const toast = useToast();
      toast?.error?.(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    // If a logout endpoint is configured, call it (fire-and-forget)
    const client = useApiClient();
    if (authConfig.endpoints.logout) {
      // fire and forget
      client(authConfig.endpoints.logout, { method: 'POST' }).catch(() => {});
    }
    navigateTo('/login');
  };

  const setUser = (data: any) => {
    user.value = data;
  };

  const bootstrap = async () => {
    // If an endpoint to fetch current user is configured, try to hydrate user on app start
    if (authConfig.endpoints.me) {
      try {
        const client = useApiClient();
        const res = await client(authConfig.endpoints.me, { method: 'GET' });
        user.value = (res as any)?.data ?? res;
      } catch (e) {
        logError(e, { stage: 'auth.bootstrap' });
      }
    }
  };

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
    bootstrap,
  };
});
