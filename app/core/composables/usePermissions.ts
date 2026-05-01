import type { Permission } from '~/core/types/auth';
import { logError } from '~/core/utils/error-logger';
import { useAuthStore } from '~/modules/auth/stores/auth.store';

export const usePermissions = () => {
  const authStore = tryUseAuthStore();

  if (!authStore || !authStore.user) return null;

  // If user doesn't have a permissions field, return null to indicate opt-out
  const userPermissions: Permission[] | undefined = authStore.user.permissions;
  if (!userPermissions) return null;

  const can = (resource: string, action: string) => {
    return userPermissions.some((p) => p.resource === resource && p.action === action);
  };

  const hasAny = (perms: Permission[]) =>
    perms.some((p) => can(p.resource as string, p.action as string));
  const hasAll = (perms: Permission[]) =>
    perms.every((p) => can(p.resource as string, p.action as string));

  return { can, hasAny, hasAll };
};

function tryUseAuthStore() {
  try {
    return useAuthStore();
  } catch (e) {
    logError(e, { stage: 'usePermissions.tryUseAuthStore' });
    return null;
  }
}
