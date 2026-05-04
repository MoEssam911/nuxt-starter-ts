<script setup lang="ts">
import type { ExampleItem } from '../types/example.types';

const props = defineProps<{
  items: ExampleItem[];
}>();

const emit = defineEmits<{
  (event: 'view' | 'edit' | 'delete', id: number): void;
}>();
</script>

<template>
  <div class="space-y-4">
    <div
      class="hidden overflow-hidden rounded-2xl border border-border bg-surface shadow-sm md:block"
    >
      <table class="w-full border-collapse text-left">
        <thead class="bg-bg-muted text-xs uppercase tracking-[0.14em] text-text-muted">
          <tr>
            <th class="px-4 py-3 font-semibold">ID</th>
            <th class="px-4 py-3 font-semibold">Title</th>
            <th class="px-4 py-3 font-semibold">User</th>
            <th class="px-4 py-3 font-semibold">Body</th>
            <th class="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in props.items"
            :key="item.id"
            class="border-t border-border/80 text-sm text-text transition hover:bg-bg-muted/50"
          >
            <td class="px-4 py-3 font-medium">#{{ item.id }}</td>
            <td class="max-w-88 px-4 py-3 font-medium">{{ item.title }}</td>
            <td class="px-4 py-3 text-text-muted">{{ item.userId }}</td>
            <td class="max-w-[24rem] px-4 py-3 text-text-muted">
              <p class="line-clamp-2">{{ item.body }}</p>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-full border border-border bg-bg px-3 py-1 text-xs font-semibold transition hover:border-primary-300 hover:text-primary"
                  @click="emit('view', item.id)"
                >
                  View
                </button>
                <button
                  type="button"
                  class="rounded-full border border-border bg-bg px-3 py-1 text-xs font-semibold transition hover:border-info-300 hover:text-info"
                  @click="emit('edit', item.id)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-xs font-semibold text-danger transition hover:bg-danger/20"
                  @click="emit('delete', item.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid gap-3 md:hidden">
      <ExampleItemCard
        v-for="item in props.items"
        :key="item.id"
        :item="item"
        @view="emit('view', $event)"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>
