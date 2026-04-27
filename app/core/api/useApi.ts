import { useApiClient, extractErrorMessage, normalizeError } from './client';
import type { ApiGetOptions, ApiGetReturn, ApiMutationOptions, ApiReturn, ApiError } from './types';
import { useToast } from '../composables/useToast';

/**
 * Unified API composable with axios-style method helpers.
 *
 * @example
 * ```ts
 * const api = useApi()
 *
 * // GET — SSR-safe, reactive, cached
 * const { data, loading, error, refresh } = api.get<User[]>('/users')
 *
 * // POST — imperative mutation
 * const { execute, loading } = api.post<User>('/users', {
 *   toast: { success: 'User created!' },
 * })
 * await execute({ name: 'John' })
 *
 * // PUT / PATCH / DELETE — same pattern
 * const { execute: update } = api.patch<User>(`/users/${id}`)
 * const { execute: remove } = api.delete(`/users/${id}`)
 * ```
 */
export const useApi = () => {
  const client = useApiClient();
  const toast = useToast();

  // ── GET (SSR-safe via useAsyncData) ────────────
  const get = <T>(url: string | (() => string), options?: ApiGetOptions<T>): ApiGetReturn<T> => {
    const resolveUrl = () => (typeof url === 'function' ? url() : url);
    const key = options?.key ?? resolveUrl();

    const asyncDataOptions: Record<string, unknown> = {};
    if (options?.lazy !== undefined) asyncDataOptions.lazy = options.lazy;
    if (options?.server !== undefined) asyncDataOptions.server = options.server;
    if (options?.immediate !== undefined) asyncDataOptions.immediate = options.immediate;
    if (options?.watch !== undefined) asyncDataOptions.watch = options.watch;
    if (options?.default !== undefined) asyncDataOptions.default = options.default;
    if (options?.transform !== undefined) asyncDataOptions.transform = options.transform;
    if (options?.getCachedData !== undefined)
      asyncDataOptions.getCachedData = options.getCachedData;
    if (options?.dedupe !== undefined) asyncDataOptions.dedupe = options.dedupe;
    if (options?.deep !== undefined) asyncDataOptions.deep = options.deep;

    const result = useAsyncData<T>(
      key,
      () =>
        client<T>(resolveUrl(), {
          method: 'GET',
          query: options?.query,
          headers: options?.headers,
        }),
      asyncDataOptions,
    );

    // Error toast watcher
    if (options?.toast !== false) {
      watch(result.error, (err) => {
        if (err) {
          const toastError = options?.toast
            ? (options.toast as { error?: boolean | string }).error
            : undefined;
          if (toastError !== false) {
            const message = typeof toastError === 'string' ? toastError : extractErrorMessage(err);
            toast.error(message);
          }
        }
      });
    }

    return {
      data: result.data as Ref<T | null>,
      loading: result.pending,
      error: result.error as Ref<ApiError | null>,
      execute: result.execute as (body?: unknown) => Promise<T | null>,
      refresh: result.refresh,
      clear: result.clear,
      status: result.status,
    };
  };

  // ── Mutation factory (POST/PUT/PATCH/DELETE) ───
  const createMutation = (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE') => {
    return <T = void>(url: string, options?: ApiMutationOptions<T>): ApiReturn<T> => {
      const data = ref<T | null>(null) as Ref<T | null>;
      const loading = ref(false);
      const error = ref<ApiError | null>(null) as Ref<ApiError | null>;

      const execute = async (body?: unknown): Promise<T | null> => {
        loading.value = true;
        error.value = null;

        try {
          const result = await client<T>(url, {
            method,
            body: body as Record<string, any>,
            headers: options?.headers,
            query: options?.query,
          });

          data.value = result;

          // Success toast
          if (options?.toast && options.toast.success) {
            const msg =
              typeof options.toast.success === 'string'
                ? options.toast.success
                : 'Operation successful';
            toast.success(msg);
          }

          await options?.onSuccess?.(result);
          return result;
        } catch (e: unknown) {
          const apiError = normalizeError(e);
          error.value = apiError;

          // Error toast (on by default for mutations)
          if (options?.toast !== false) {
            const toastError = options?.toast?.error;
            if (toastError !== false) {
              const msg = typeof toastError === 'string' ? toastError : apiError.message;
              toast.error(msg);
            }
          }

          options?.onError?.(apiError);
          throw apiError;
        } finally {
          loading.value = false;
        }
      };

      return { data, loading, error, execute };
    };
  };

  return {
    /** SSR-safe data fetching. Wraps `useAsyncData` + configured `$fetch`. */
    get,
    /** Imperative POST mutation. Returns `{ execute, loading, error, data }`. */
    post: createMutation('POST'),
    /** Imperative PUT mutation. Returns `{ execute, loading, error, data }`. */
    put: createMutation('PUT'),
    /** Imperative PATCH mutation. Returns `{ execute, loading, error, data }`. */
    patch: createMutation('PATCH'),
    /** Imperative DELETE mutation. Returns `{ execute, loading, error, data }`. */
    delete: createMutation('DELETE'),
  };
};
