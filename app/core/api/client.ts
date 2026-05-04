import { generateRequestId } from '~/core/utils/request-id';
import { logError } from '~/core/utils/error-logger';

import type { ApiError } from './types';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
};

/**
 * Configured $fetch client with baseURL, request ID injection, and lightweight error logging.
 * This is the raw transport layer — use `useApi()` in pages/services, not this directly.
 *
 * Exports:
 * - `request<T>()` — Throws ApiError on failure. Use in non-critical code.
 * - `raw` — Access raw $fetch instance if needed.
 */
export const useApiClient = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || undefined;

  const api = $fetch.create({
    baseURL,

    onRequest({ options }) {
      const rid = generateRequestId();
      options.headers = new Headers(options.headers || {});
      options.headers.set('X-Request-ID', rid);
    },

    onResponseError({ response }) {
      const requestId =
        response?.url && response ? (response as any).headers?.get?.('X-Request-ID') : undefined;

      const apiErr: ApiError = {
        status: response.status ?? 500,
        message: response.statusText ?? 'Request failed',
      };
      logError(apiErr, { requestId, url: response?.url });
    },
  });

  const request = async <T>(url: string, options?: FetchOptions): Promise<T> => {
    try {
      return await api<T>(url, {
        method: options?.method || 'GET',
        body: options?.body as Record<string, any> | undefined,
        headers: options?.headers,
        query: options?.query,
      });
    } catch (error) {
      throw normalizeError(error);
    }
  };

  return {
    raw: api,
    request,
  };
};

/**
 * Extract a human-readable message from any error shape.
 * Handles: FetchError, Nuxt errors, standard Error, strings.
 */
export function extractErrorMessage(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  if (typeof error === 'object' && error !== null) {
    const err = error as any;

    // FetchError (ofetch) wraps response data
    if (err.data?.message) return err.data.message;
    if (err.data?.error) return err.data.error;

    // Standard JavaScript Error
    if (err.message) return err.message;

    // Nuxt/HTTP status message
    if (err.statusMessage) return err.statusMessage;
  }

  if (typeof error === 'string') return error;

  return 'An unknown error occurred';
}

/**
 * Normalize any error into standardized ApiError shape.
 * Extracts status code, message, and validation errors.
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

/**
 * Type guard: Check if value is ApiError
 */
export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'message' in value &&
    typeof (value as any).status === 'number' &&
    typeof (value as any).message === 'string'
  );
}
