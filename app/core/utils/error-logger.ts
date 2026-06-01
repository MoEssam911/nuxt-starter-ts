import type { ApiError } from '~/core/api/types';

export const logError = (err: unknown, ctx: Record<string, unknown> = {}) => {
  if (import.meta.dev) {
    // Developer-friendly console output
    // eslint-disable-next-line no-console
    console.error('[app:error]', err, ctx);
  }
  // In production, projects can wire their own error reporters by
  // replacing this function or listening to global errors.
};

export const logApiError = (apiErr: ApiError, ctx: Record<string, unknown> = {}) => {
  const context = { ...ctx, status: apiErr.status, errors: apiErr.errors };
  logError(apiErr, context);
};
