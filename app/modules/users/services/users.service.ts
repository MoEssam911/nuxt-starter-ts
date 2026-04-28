import type { User } from '../types';

// ── Queries (call in setup — SSR-safe) ───────────

export const useUsers = () => {
  const api = useApi();
  return api.get<User[]>('/users');
};

export const useUser = (id: MaybeRef<number | string>) => {
  const api = useApi();
  return api.get<User>(() => `/users/${toValue(id)}`, {
    watch: [() => toValue(id)],
  });
};

// ── Mutations (call execute() in event handlers) ─

export const useCreateUser = () => {
  const api = useApi();
  return api.post<User>('/users', {
    toast: { success: 'User created successfully!' },
  });
};

export const useUpdateUser = (id: number | string) => {
  const api = useApi();
  return api.patch<User>(`/users/${id}`, {
    toast: { success: 'User updated!' },
  });
};

export const useDeleteUser = (id: number | string) => {
  const api = useApi();
  return api.delete(`/users/${id}`, {
    toast: { success: 'User deleted' },
  });
};
