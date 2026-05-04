import { useApiClient } from './client';
import type { QueryOptions, MutationOptions, QueryResult, MutationResult, ApiError } from './types';

/**
 * Unified API composable for both SSR-safe queries and imperative mutations.
 *
 * @example
 * ```typescript
 * // Simple GET (auto SSR hydrated, deduplicated)
 * const { data, pending, error } = useApi().get('/users')
 *
 * // Advanced GET with options
 * const { data, pending, error, refresh } = useApi().get('/users', {
 *   watch: [route],
 *   transform: (users) => users.filter(u => u.active),
 *   lazy: true
 * })
 *
 * // Mutation with callback
 * const { data, loading, error, execute } = useApi().post('/users', {
 *   onSuccess: () => router.push('/users'),
 *   onError: (err) => toast.error(err.message)
 * })
 * await mutation.execute({ name: 'John' })
 * ```
 */
export const useApi = () => {
  const { request } = useApiClient();

  // ── GET / Queries (SSR-safe via useAsyncData) ──────
  const get = <T>(url: string | (() => string), options?: QueryOptions<T>): QueryResult<T> => {
    const resolveUrl = () => (typeof url === 'function' ? url() : url);
    const key = options?.key ?? resolveUrl();

    // Smart defaults for queries
    const asyncDataDefaults: any = {
      server: true,
      dedupe: 'cancel',
    };

    // Merge user options with defaults
    const mergedOptions = {
      ...asyncDataDefaults,
      ...options,
    };

    // Call useAsyncData with merged options (pass directly, Nuxt handles them)
    const result = useAsyncData<T>(
      key,
      () =>
        request<T>(resolveUrl(), {
          method: 'GET',
          query: options?.query,
          headers: options?.headers,
        }),
      mergedOptions,
    );

    return {
      data: result.data as Ref<T | null>,
      pending: result.pending,
      error: result.error as Ref<ApiError | null>,
      refresh: result.refresh,
      clear: result.clear,
      status: result.status,
    };
  };

  // ── Mutation factory (POST/PUT/PATCH/DELETE) ───────
  const createMutation = (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE') => {
    return <T = void>(url: string, options?: MutationOptions<T>): MutationResult<T> => {
      const data = ref<T | null>(null) as Ref<T | null>;
      const loading = ref(false);
      const error = ref<ApiError | null>(null) as Ref<ApiError | null>;

      const execute = async (body?: unknown): Promise<T | null> => {
        loading.value = true;
        error.value = null;

        try {
          const result = await request<T>(url, {
            method,
            body,
            headers: options?.headers,
            query: options?.query,
          });

          data.value = result;
          if (result !== null) {
            await options?.onSuccess?.(result);
          }

          return result;
        } catch (caughtError) {
          const apiError = caughtError as ApiError;
          error.value = apiError;
          options?.onError?.(apiError);
          return null;
        } finally {
          loading.value = false;
        }
      };

      return { data, loading, error, execute };
    };
  };

  return {
    /**
     * SSR-safe data fetching (GET).
     * Automatically hydrated on client, deduplicates identical requests.
     * Use with watch option for reactive route/search parameters.
     */
    get,

    /**
     * Imperative POST mutation.
     * Returns { data, loading, error, execute }.
     * Call execute(payload) to trigger.
     */
    post: createMutation('POST'),

    /**
     * Imperative PUT mutation.
     * Returns { data, loading, error, execute }.
     * Call execute(payload) to trigger.
     */
    put: createMutation('PUT'),

    /**
     * Imperative PATCH mutation.
     * Returns { data, loading, error, execute }.
     * Call execute(payload) to trigger.
     */
    patch: createMutation('PATCH'),

    /**
     * Imperative DELETE mutation.
     * Returns { data, loading, error, execute }.
     * Call execute() or execute(body) to trigger.
     */
    delete: createMutation('DELETE'),
  };
};
