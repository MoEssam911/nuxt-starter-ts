import type { AuthUser } from '~/types/api';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<AuthUser | null>(null);

    const setUser = (newUser: AuthUser) => {
      user.value = newUser;
    };

    const clearUser = () => {
      user.value = null;
    };

    return { user, setUser, clearUser };
  },
  {
    persist: {
      key: 'auth_user',
      storage: import.meta.client ? localStorage : undefined,
      pick: ['user'],
    },
  },
);
