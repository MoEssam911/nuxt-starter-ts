<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ApiError } from '../../../core/api/types';
import { useToast } from '../../../core/composables/useToast';

import { useExampleService } from '../services/example.service';
import type { ExampleItem } from '../types/example.types';

const exampleService = useExampleService();
const toast = useToast();
const router = useRouter();

const items = ref<ExampleItem[]>([]);
const loading = ref(false);
const error = ref<ApiError | null>(null);

const reloadList = async () => {
  loading.value = true;
  error.value = null;

  const result = await exampleService.getItems();
  items.value = result.data.value ?? [];
  error.value = result.error.value;
  loading.value = false;
};

onMounted(() => {
  reloadList();
});

const onDelete = async (id: number) => {
  const mutation = exampleService.deleteItem(id);
  await mutation.execute();

  if (mutation.error.value) {
    toast.error('Delete failed', mutation.error.value.message);
    return;
  }

  toast.success('Item deleted', `Post #${id} was removed from the current list.`);
  await reloadList();
};
</script>

<template>
  <main class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
    <ExamplePageHeader
      kicker="Example module"
      title="Simple API list"
      description="A small reference module showing list, details, and create/edit flows with a clean service layer."
    >
      <template #actions>
        <NuxtLink
          to="/example/create-edit"
          class="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          New Item
        </NuxtLink>
        <button
          type="button"
          class="rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-text transition hover:border-primary-300 hover:text-primary"
          @click="reloadList"
        >
          Refresh
        </button>
      </template>
    </ExamplePageHeader>

    <ExampleStateBlock
      :loading="loading"
      :error="error"
      :empty="!loading && !error && !items.length"
      empty-title="No items found"
      empty-description="Reload the list or create a new post from the create/edit page."
    >
      <ExampleListTable
        :items="items"
        @view="router.push(`/example/${$event}`)"
        @edit="router.push(`/example/create-edit?id=${$event}`)"
        @delete="onDelete($event)"
      />
    </ExampleStateBlock>
  </main>
</template>
