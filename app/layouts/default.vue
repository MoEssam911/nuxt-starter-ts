<script setup lang="ts">
const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <div>
    <header class="p-4 border-b border-border">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Nuxt Enterprise Starter</h1>
        <button
          class="px-4 py-2 rounded-md bg-surface hover:bg-primary hover:text-white transition-colors"
          @click="toggleTheme()"
        >
          {{ isDark ? '☀️ Light' : '🌙 Dark' }}
        </button>
      </div>
    </header>
    <slot />
    <UiToastProvider />
  </div>
</template>
