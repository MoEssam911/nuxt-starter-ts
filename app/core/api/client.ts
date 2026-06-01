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
 * Configured $fetch client with baseURL, Bearer token injection, request ID tracing,
 * and global 401/403 handling.
 *
 * This is the raw transport layer — use `useApi()` in pages/services, not this directly.
 */
export const useApiClient = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || undefined;

  const api = $fetch.create({
    baseURL,

    onRequest({ options }) {
      const token = useCookie<string | null>('auth_token');
      const rid = generateRequestId();

      options.headers = new Headers((options.headers as HeadersInit) || {});
      options.headers.set('X-Request-ID', rid);

      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`);
      }
    },

    onResponseError({ response }) {
      const nuxtApp = useNuxtApp();

      if (response.status === 401) {
        const token = useCookie<string | null>('auth_token');
        token.value = null;
        nuxtApp.runWithContext(() => navigateTo('/auth/login'));
        return;
      }

      if (response.status === 403) {
        nuxtApp.runWithContext(() => navigateTo('/403'));
        return;
      }

      const apiErr: ApiError = {
        status: response.status ?? 500,
        message: response.statusText ?? 'Request failed',
      };
      logError(apiErr, { url: response?.url });
    },
  });

  const request = async <T>(url: string, options?: FetchOptions): Promise<T> => {
    try {
      return await api<T>(url, {
        method: options?.method || 'GET',
        body: options?.body as Record<string, unknown> | undefined,
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
    const err = error as Record<string, unknown>;

    if (err['data'] && typeof err['data'] === 'object') {
      const data = err['data'] as Record<string, unknown>;
      if (typeof data['message'] === 'string') return data['message'];
      if (typeof data['error'] === 'string') return data['error'];
    }

    if (typeof err['message'] === 'string') return err['message'];
    if (typeof err['statusMessage'] === 'string') return err['statusMessage'];
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
    const err = error as Record<string, unknown>;
    const maybeStatus =
      err['status'] ??
      err['statusCode'] ??
      (err['response'] as Record<string, unknown> | undefined)?.['status'];
    if (typeof maybeStatus === 'number') {
      status = maybeStatus;
    }
    const maybeErrors =
      (err['data'] as Record<string, unknown> | undefined)?.['errors'] ?? err['errors'];
    if (maybeErrors && typeof maybeErrors === 'object') {
      errors = maybeErrors as Record<string, string[]>;
    }
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
    typeof (value as ApiError).status === 'number' &&
    typeof (value as ApiError).message === 'string'
  );
}
