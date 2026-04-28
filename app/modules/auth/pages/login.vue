<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { useAuthStore } from '../stores/auth.store';

definePageMeta({
  middleware: 'guest',
  layout: 'auth',
});

const auth = useAuthStore();

// 1. Define Zod Schema
const validationSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email is required').email('Must be a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
);

// 2. Setup VeeValidate Form
const { handleSubmit, defineField, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
  },
});

// 3. Define Fields (these connect the UI inputs to the form state automatically)
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// 4. Handle Submission (only runs if validation passes)
const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.login(values);
    await navigateTo('/');
  } catch {
    // Error toast is already handled by the auth store
  }
});
</script>

<template>
  <div class="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign In</h1>

    <form class="space-y-4" @submit="onSubmit">
      <!-- Email Field using the Headless Wrapper -->
      <UiFormField name="email" label="Email Address">
        <template #default="{ id, hasError }">
          <input
            :id="id"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="you@example.com"
            class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
          />
        </template>
      </UiFormField>

      <!-- Password Field using the Headless Wrapper -->
      <UiFormField name="password" label="Password">
        <template #default="{ id, hasError }">
          <input
            :id="id"
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            placeholder="••••••••"
            class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
          />
        </template>
      </UiFormField>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Signing in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
