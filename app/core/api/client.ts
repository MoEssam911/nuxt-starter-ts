import { useAuthStore } from '~/modules/auth/stores/auth.store';

import type { ApiError } from './types';

/**
 * Configured $fetch client with baseURL, auth header injection, and 401 handling.
 * This is the raw transport layer — use `useApi()` in pages/services, not this directly.
 */
export const useApiClient = () => {
  const config = useRuntimeConfig();
  const token = useCookie<string | null>('token');

  const api = $fetch.create({
    baseURL: config.public.apiBase as string,

    onRequest({ options }) {
      if (token.value) {
        options.headers = new Headers(options.headers || {});
        options.headers.set('Authorization', `Bearer ${token.value}`);
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        const auth = useAuthStore();
        auth.logout();
      }
    },
  });

  return api;
};

// ── Error Helpers ────────────────────────────────

/**
 * Extract a human-readable message from any error shape.
 */
export function extractErrorMessage(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  // Nuxt/ofetch error with response data
  if (typeof error === 'object' && error !== null) {
    const err = error as any;

    // ofetch wraps errors in err.data
    if (err.data?.message) return err.data.message;
    if (err.data?.error) return err.data.error;

    // Standard Error
    if (err.message) return err.message;

    // HTTP status text
    if (err.statusMessage) return err.statusMessage;
  }

  if (typeof error === 'string') return error;

  return 'An unknown error occurred';
}

/**
 * Normalize any caught error into a consistent ApiError shape.
 */
export function normalizeError(error: unknown): ApiError {
  const message = extractErrorMessage(error);
  let status = 500;
  let errors: Record<string, string[]> | undefined;

  if (typeof error === 'object' && error !== null) {
    const err = error as any;
    status = err.status ?? err.statusCode ?? err.response?.status ?? 500;
    errors = err.data?.errors ?? err.errors;
  }

  return { status, message, errors };
}
