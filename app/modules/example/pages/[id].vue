<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { ApiError } from '../../../core/api/types';
import { useToast } from '../../../core/composables/useToast';

import { useExampleService } from '../services/example.service';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const toast = useToast();
const exampleService = useExampleService();

const itemId = computed(() => Number(route.params.id));

const item = ref<null | { userId: number; id: number; title: string; body: string }>(null);
const loading = ref(false);
const error = ref<ApiError | null>(null);

const deleting = ref(false);

const loadCurrentItem = async () => {
  if (!Number.isFinite(itemId.value) || itemId.value <= 0) return;

  loading.value = true;

  const result = await exampleService.getItemById(itemId.value);
  error.value = result.error.value;
  item.value = result.data.value;
  loading.value = false;
};

onMounted(() => {
  loadCurrentItem();
});

watch(
  () => route.params.id,
  () => {
    loadCurrentItem();
  },
);

const deleteCurrentItem = async () => {
  if (!item.value) return;

  deleting.value = true;

  const mutation = exampleService.deleteItem(item.value.id);
  await mutation.execute();
  deleting.value = false;

  if (mutation.error.value) {
    toast.error('Delete failed', mutation.error.value.message);
    return;
  }

  toast.success('Item deleted', 'The item was deleted successfully.');
  await router.push(localePath('/example'));
};
</script>

<template>
  <main class="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
    <ExamplePageHeader
      kicker="Example details"
      title="Read single item"
      description="Details page demonstrates a clean read flow with service-only API access."
    >
      <template #actions>
        <NuxtLinkLocale
          to="/example"
          class="rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-text transition hover:border-primary-300 hover:text-primary"
        >
          Back to list
        </NuxtLinkLocale>
        <NuxtLinkLocale
          :to="`/example/create-edit?id=${itemId}`"
          class="rounded-full border border-info/40 bg-info/10 px-5 py-2.5 text-sm font-semibold text-info transition hover:bg-info/20"
        >
          Edit
        </NuxtLinkLocale>
      </template>
    </ExamplePageHeader>

    <ExampleStateBlock
      :loading="loading"
      :error="error"
      :empty="!loading && !error && !item"
      empty-title="Item not found"
      empty-description="The requested item could not be loaded from the API."
    >
      <article class="rounded-3xl border border-border bg-surface p-6 shadow-sm">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
          >
            Post #{{ item?.id }}
          </span>
          <span class="rounded-full bg-bg px-3 py-1 text-xs font-semibold text-text-muted">
            User {{ item?.userId }}
          </span>
        </div>

        <h2 class="mt-4 text-2xl font-bold leading-tight text-text">
          {{ item?.title }}
        </h2>

        <p class="mt-4 whitespace-pre-wrap text-sm leading-7 text-text-muted">
          {{ item?.body }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            class="rounded-full border border-danger/30 bg-danger/10 px-5 py-2.5 text-sm font-semibold text-danger transition hover:bg-danger/20"
            :disabled="deleting"
            @click="deleteCurrentItem"
          >
            Delete Item
          </button>
        </div>
      </article>
    </ExampleStateBlock>
  </main>
</template>
