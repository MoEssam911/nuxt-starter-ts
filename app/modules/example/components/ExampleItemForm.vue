<script setup lang="ts">
import { reactive, watch } from 'vue';

import type { ExampleFormValues } from '../types/example.types';

const props = withDefaults(
  defineProps<{
    modelValue?: ExampleFormValues;
    submitting?: boolean;
    mode?: 'create' | 'edit';
  }>(),
  {
    modelValue: () => ({
      userId: 1,
      title: '',
      body: '',
    }),
    submitting: false,
    mode: 'create',
  },
);

const emit = defineEmits<{
  (event: 'submit', payload: ExampleFormValues): void;
  (event: 'cancel'): void;
}>();

const formState = reactive<ExampleFormValues>({
  userId: props.modelValue.userId,
  title: props.modelValue.title,
  body: props.modelValue.body,
});

watch(
  () => props.modelValue,
  (nextValue) => {
    formState.userId = nextValue.userId;
    formState.title = nextValue.title;
    formState.body = nextValue.body;
  },
  { deep: true },
);

const submit = () => {
  emit('submit', {
    userId: Number(formState.userId),
    title: formState.title.trim(),
    body: formState.body.trim(),
  });
};
</script>

<template>
  <form
    class="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    @submit.prevent="submit"
  >
    <div class="grid gap-4">
      <UiFormField
        v-model="formState.userId"
        as="input"
        type="number"
        name="userId"
        label="User ID"
        required
        description="JSONPlaceholder allows user IDs from 1 to 10 in sample data."
      />

      <UiFormField
        v-model="formState.title"
        as="input"
        name="title"
        label="Title"
        placeholder="Write a concise, meaningful title"
        required
      />

      <UiFormField
        v-model="formState.body"
        as="textarea"
        name="body"
        label="Body"
        placeholder="Describe the post content"
        :rows="6"
        required
      />
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <button
        type="submit"
        class="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="props.submitting"
      >
        {{ props.mode === 'create' ? 'Create Item' : 'Save Changes' }}
      </button>

      <button
        type="button"
        class="rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-text transition hover:border-primary-300 hover:text-primary"
        :disabled="props.submitting"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
