<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number;
    statusMessage: string;
    message: string;
  };
}>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <div class="text-center max-w-md">
      <p class="text-8xl font-black text-muted-foreground mb-4">
        {{ props.error.statusCode }}
      </p>
      <h1 class="text-2xl font-semibold text-foreground mb-2">
        {{ props.error.statusMessage || 'Something went wrong' }}
      </h1>
      <p class="text-muted-foreground mb-8">
        {{ props.error.message }}
      </p>
      <button
        class="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        @click="handleError"
      >
        Go home
      </button>
    </div>
  </div>
</template>
