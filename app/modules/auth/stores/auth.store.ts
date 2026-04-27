import { defineStore } from 'pinia';

import { useApiClient, normalizeError } from '~/core/api/client';

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>('token');
  const user = ref(null);
  const isAuthenticated = computed(() => Boolean(token.value));

  const login = async (credentials: { email: string; password: string }) => {
    const client = useApiClient();
    const toast = useToast();

    try {
      const response = await client<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: credentials,
      });

      token.value = response.token;
      user.value = response.user;
      toast.success('Login successful!');
    } catch (e: unknown) {
      const error = normalizeError(e);
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo('/login');
  };

  const setUser = (data: any) => {
    user.value = data;
  };

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
  };
});
