import type { Ref, WatchSource } from 'vue';

/**
 * Standardized API error shape with optional validation errors
 */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Generic API response wrapper (optional, used by some backends)
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * Options for query operations (GET, etc.)
 * Supports SSR hydration, caching, deduplication, and reactivity
 */
export interface QueryOptions<T> {
  /** Unique cache key. Defaults to URL. */
  key?: string;
  /** Start fetch after hydration (default: false). */
  lazy?: boolean;
  /** Fetch on server (default: true). */
  server?: boolean;
  /** Fetch immediately (default: true). */
  immediate?: boolean;
  /** Re-fetch when these dependencies change. */
  watch?: WatchSource[] | false;
  /** Default value while loading. */
  default?: () => T | Ref<T>;
  /** Transform API response before storing. */
  transform?: (data: unknown) => T;
  /** Custom cache getter for stale-while-revalidate. */
  getCachedData?: (key: string, nuxtApp: ReturnType<typeof useNuxtApp>) => T | undefined;
  /** Deduplication strategy: 'cancel' (default for GET) or 'defer'. */
  dedupe?: 'cancel' | 'defer';
  /** Deep watch (when watch is used). */
  deep?: boolean;
  /** Query parameters. */
  query?: Record<string, unknown>;
  /** Custom headers. */
  headers?: Record<string, string>;
}

/**
 * Options for mutation operations (POST, PUT, PATCH, DELETE)
 */
export interface MutationOptions<T> {
  /** Custom headers. */
  headers?: Record<string, string>;
  /** Query parameters. */
  query?: Record<string, unknown>;
  /** Called when mutation succeeds. */
  onSuccess?: (data: T) => void | Promise<void>;
  /** Called when mutation fails. */
  onError?: (error: ApiError) => void;
}

/**
 * Result from a query operation (GET, etc.)
 * Includes refresh() for manual re-fetching and hydration control
 */
export interface QueryResult<T> {
  data: Ref<T | null>;
  pending: Ref<boolean>;
  error: Ref<ApiError | null>;
  refresh: (opts?: { dedupe?: 'cancel' | 'defer' }) => Promise<void>;
  clear: () => void;
  status: Ref<'idle' | 'pending' | 'success' | 'error'>;
}

/**
 * Result from a mutation operation (POST, PUT, PATCH, DELETE)
 * Includes execute() to trigger the mutation
 */
export interface MutationResult<T, B = unknown> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<ApiError | null>;
  execute: (body?: B) => Promise<T | null>;
}
