/**
 * Re-exports useApi from the core infrastructure layer.
 *
 * This file exists so `useApi` is resolvable via `~/composables/useApi`
 * while the actual implementation lives in `~/core/api/useApi`.
 *
 * Do not add implementation here.
 */
export { useApi } from '~/core/api/useApi';
export type {
  ApiError,
  QueryOptions,
  MutationOptions,
  QueryResult,
  MutationResult,
} from '~/core/api/types';
