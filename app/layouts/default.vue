<script setup lang="ts">
import { useTheme } from '../core/composables/useTheme';

const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <div class="app-shell">
    <header class="app-shell__header">
      <div class="app-shell__brand">
        <span class="app-shell__badge">Starter</span>
        <NuxtLink to="/">Nuxt Starter</NuxtLink>
      </div>

      <div class="starter-demo-actions">
        <NuxtLink class="starter-demo-button" to="/example">Example Module</NuxtLink>
        <button class="starter-demo-button" type="button" @click="toggleTheme()">
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </button>
      </div>
    </header>

    <slot />

    <UiToastProvider />
  </div>
</template>
