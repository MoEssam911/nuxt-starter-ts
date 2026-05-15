<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { ApiError } from '../../../core/api/types';
import { useToast } from '../../../core/composables/useToast';

import { useExampleService } from '../services/example.service';
import type { ExampleFormValues } from '../types/example.types';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const toast = useToast();
const exampleService = useExampleService();

const editId = computed(() => {
  const idParam = Number(route.query.id);
  if (!Number.isFinite(idParam) || idParam <= 0) return null;
  return idParam;
});

const isEditMode = computed(() => editId.value !== null);

const formValues = ref<ExampleFormValues>({
  userId: 1,
  title: '',
  body: '',
});

const detailLoading = ref(false);
const detailError = ref<ApiError | null>(null);

const loadEditData = async () => {
  if (!isEditMode.value || !editId.value) return;

  detailLoading.value = true;

  const result = await exampleService.getItemById(editId.value);
  detailError.value = result.error.value;

  if (result.data.value) {
    formValues.value = {
      userId: result.data.value.userId,
      title: result.data.value.title,
      body: result.data.value.body,
    };
  }

  detailLoading.value = false;
};

onMounted(() => {
  loadEditData();
});

watch(
  () => route.query.id,
  () => {
    loadEditData();
  },
);

const submitting = ref(false);

const submitForm = async (payload: ExampleFormValues) => {
  submitting.value = true;

  if (isEditMode.value && editId.value) {
    const mutation = exampleService.updateItem(editId.value);
    const updated = await mutation.execute(payload);
    submitting.value = false;

    if (!updated || mutation.error.value) {
      toast.error('Update failed', mutation.error.value?.message || 'Please try again.');
      return;
    }

    toast.success('Item updated', `Post #${updated.id} was updated.`);
    await router.push(localePath(`/example/${updated.id}`));
    return;
  }

  const mutation = exampleService.createItem();
  const created = await mutation.execute(payload);
  submitting.value = false;

  if (!created || mutation.error.value) {
    toast.error('Create failed', mutation.error.value?.message || 'Please try again.');
    return;
  }

  toast.success('Item created', `Post #${created.id} was created.`);
  await router.push(localePath(`/example/${created.id}`));
};

const cancel = async () => {
  if (isEditMode.value && editId.value) {
    await router.push(localePath(`/example/${editId.value}`));
    return;
  }

  await router.push(localePath('/example'));
};
</script>

<template>
  <main class="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
    <ExamplePageHeader
      kicker="Example form"
      :title="isEditMode ? 'Edit item' : 'Create item'"
      :description="
        isEditMode
          ? 'Update an existing post with a clean, service-driven workflow.'
          : 'Create a post through reusable form components and centralized API handling.'
      "
    >
      <template #actions>
        <NuxtLinkLocale
          to="/example"
          class="rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-text transition hover:border-primary-300 hover:text-primary"
        >
          Back to list
        </NuxtLinkLocale>
      </template>
    </ExamplePageHeader>

    <ExampleStateBlock :loading="detailLoading" :error="detailError" :empty="false">
      <ExampleItemForm
        :model-value="formValues"
        :submitting="submitting"
        :mode="isEditMode ? 'edit' : 'create'"
        @submit="submitForm"
        @cancel="cancel"
      />
    </ExampleStateBlock>
  </main>
</template>
