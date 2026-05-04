<script setup lang="ts">
import type { ApiError } from '../../../core/api/types';

withDefaults(
  defineProps<{
    loading?: boolean;
    error?: ApiError | null;
    empty?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
  }>(),
  {
    loading: false,
    error: null,
    empty: false,
    emptyTitle: 'No data found',
    emptyDescription: 'Try adjusting your filters or creating a new item.',
  },
);
</script>

<template>
  <div v-if="loading" class="rounded-2xl border border-border bg-surface p-6 shadow-sm">
    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-text-muted">Loading</p>
    <div class="mt-3 h-3 w-40 animate-pulse rounded bg-bg-muted" />
    <div class="mt-2 h-3 w-52 animate-pulse rounded bg-bg-muted" />
  </div>

  <div v-else-if="error" class="rounded-2xl border border-danger/30 bg-danger/10 p-6 shadow-sm">
    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-danger">Request failed</p>
    <p class="mt-2 text-sm text-danger">{{ error.message }}</p>
  </div>

  <div
    v-else-if="empty"
    class="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm"
  >
    <h3 class="text-lg font-semibold text-text">{{ emptyTitle }}</h3>
    <p class="mt-2 text-sm text-text-muted">{{ emptyDescription }}</p>
  </div>

  <slot v-else />
</template>
