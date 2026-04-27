<script setup lang="ts">
const error = useError();

const isDev = import.meta.dev;
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
    <h1 class="text-4xl font-bold">
      {{ error?.statusCode || 500 }}
    </h1>

    <p class="text-lg text-gray-500">
      {{ error?.statusMessage || 'Something went wrong' }}
    </p>

    <pre
      v-if="isDev && error?.data"
      class="mt-6 max-w-xl overflow-auto rounded bg-black p-4 text-left text-sm text-red-400"
      >{{ error.data }}
    </pre>

    <button
      class="mt-6 rounded bg-primary px-4 py-2 text-white"
      @click="clearError({ redirect: '/' })"
    >
      Go home
    </button>
  </div>
</template>
