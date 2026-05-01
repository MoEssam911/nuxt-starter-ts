import { useAuthStore } from '~/modules/auth/stores/auth.store';
import { generateRequestId } from '~/core/utils/request-id';
import { logError } from '~/core/utils/error-logger';

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
      // attach auth header when available
      if (token.value) {
        options.headers = new Headers(options.headers || {});
        options.headers.set('Authorization', `Bearer ${token.value}`);
      }

      // attach a request id for tracing
      try {
        const rid = generateRequestId();
        options.headers = new Headers(options.headers || {});
        options.headers.set('X-Request-ID', rid);
        // request id is sent via header for downstream tracing
      } catch (e) {
        logError(e, { stage: 'onRequest.requestId' });
      }
    },

    onResponseError({ response }) {
      const requestId =
        response?.url && response ? (response as any).headers?.get?.('X-Request-ID') : undefined;
      try {
        const apiErr: ApiError = {
          status: response.status ?? 500,
          message: response.statusText ?? 'Request failed',
        };
        logError(apiErr, { requestId, url: response?.url });
      } catch (e) {
        logError(e, { stage: 'onResponseError.log' });
      }

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

  // Nuxt error with response data
  if (typeof error === 'object' && error !== null) {
    const err = error as any;

    // wraps errors in err.data
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
