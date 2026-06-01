import type { ApiResponse, AuthUser } from '~/types/api';

interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const useAuth = () => {
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    secure: import.meta.env.PROD,
  });

  const authStore = useAuthStore();

  const isAuthenticated = computed(() => Boolean(token.value));
  const user = computed(() => authStore.user);

  const login = async (credentials: Record<string, string>) => {
    const { apiFetch } = useApi();
    const response = await apiFetch<ApiResponse<LoginResponse>>('/auth/login', {
      method: 'POST',
      body: credentials,
    });
    token.value = response.data.token;
    authStore.setUser(response.data.user);
  };

  const logout = async () => {
    token.value = null;
    authStore.clearUser();
    await navigateTo('/auth/login');
  };

  return {
    token,
    isAuthenticated,
    user,
    login,
    logout,
  };
};
