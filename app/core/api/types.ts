import type { Ref, WatchSource } from 'vue';

// ── Toast Options ────────────────────────────────
/**
 * Controls toast behavior for an API call.
 *  - `true`   → show toast with auto-extracted message
 *  - `string` → show toast with that custom message
 *  - `false`  → suppress toast
 */
export interface ApiToastOptions {
  /** Show a toast on success. Default: `false` for GET, `false` for mutations. */
  success?: boolean | string;
  /** Show a toast on error. Default: `true` (auto-extract message). */
  error?: boolean | string;
}

// ── Error Shape ──────────────────────────────────
/** Normalized error returned by the API layer. */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// ── Response Envelope ────────────────────────────
/** Use with `transform` if your backend wraps responses. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ── GET Options ──────────────────────────────────
export interface ApiGetOptions<T> {
  /** Toast configuration. Pass `false` to disable all toasts. */
  toast?: ApiToastOptions | false;

  // Nuxt useAsyncData pass-through options
  key?: string;
  lazy?: boolean;
  server?: boolean;
  immediate?: boolean;
  watch?: WatchSource[] | false;
  default?: () => T | Ref<T>;
  transform?: (data: any) => T;
  getCachedData?: (key: string, nuxtApp: any) => T | undefined;
  dedupe?: 'cancel' | 'defer';
  deep?: boolean;

  // HTTP extras
  query?: Record<string, any>;
  headers?: Record<string, string>;
}

// ── Mutation Options ─────────────────────────────
export interface ApiMutationOptions<T> {
  /** Toast configuration. Pass `false` to disable all toasts. */
  toast?: ApiToastOptions | false;

  // HTTP extras
  headers?: Record<string, string>;
  query?: Record<string, any>;

  // Callbacks
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: ApiError) => void;
}

// ── Return Types ─────────────────────────────────
/** Shared return shape for all API methods. */
export interface ApiReturn<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<ApiError | null>;
  execute: (body?: unknown) => Promise<T | null>;
}

/** Extended return for `api.get()` — includes refresh, clear, status from useAsyncData. */
export interface ApiGetReturn<T> extends ApiReturn<T> {
  refresh: (opts?: { dedupe?: 'cancel' | 'defer' }) => Promise<void>;
  clear: () => void;
  status: Ref<'idle' | 'pending' | 'success' | 'error'>;
}
