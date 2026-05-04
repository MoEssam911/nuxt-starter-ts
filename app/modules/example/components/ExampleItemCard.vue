<script setup lang="ts">
import type { ExampleItem } from '../types/example.types';

const props = defineProps<{
  item: ExampleItem;
}>();

const emit = defineEmits<{
  (event: 'view' | 'edit' | 'delete', id: number): void;
}>();
</script>

<template>
  <article
    class="rounded-2xl border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="mb-3 flex items-start justify-between gap-3">
      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        Post #{{ props.item.id }}
      </p>
      <span
        class="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
      >
        User {{ props.item.userId }}
      </span>
    </div>

    <h3 class="line-clamp-2 text-base font-semibold text-text">{{ props.item.title }}</h3>
    <p class="mt-2 line-clamp-3 text-sm leading-6 text-text-muted">{{ props.item.body }}</p>

    <div class="mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-text transition hover:border-primary-300 hover:text-primary"
        @click="emit('view', props.item.id)"
      >
        Details
      </button>
      <button
        type="button"
        class="rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-text transition hover:border-info-300 hover:text-info"
        @click="emit('edit', props.item.id)"
      >
        Edit
      </button>
      <button
        type="button"
        class="rounded-full border border-danger/30 bg-danger/10 px-3 py-1.5 text-xs font-semibold text-danger transition hover:bg-danger/20"
        @click="emit('delete', props.item.id)"
      >
        Delete
      </button>
    </div>
  </article>
</template>
