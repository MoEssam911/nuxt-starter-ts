<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  description?: string;
}>();

// Automatically extracts the error message for this field from the parent form
const { errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="mb-4">
    <!-- Optional Label -->
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
    </label>

    <!-- Slot for the actual input component (headless) -->
    <!-- We expose the generated ID and whether it's currently in an error state -->
    <slot :id="name" :has-error="!!errorMessage" />

    <!-- Error Message -->
    <p v-if="errorMessage" class="mt-1 text-sm text-red-500">
      {{ errorMessage }}
    </p>

    <!-- Description (only shows if no error) -->
    <p v-else-if="description" class="mt-1 text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>
