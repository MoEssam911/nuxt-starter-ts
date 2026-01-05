<template>
  <h1 class="text-3xl font-bold underline bg-primary dark:bg-secondary">Hello world!</h1>
  <button @click="toggleTheme()" class="bg-primary dark:bg-secondary">Toggle Theme</button>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { toggleTheme } = useTheme();
</script>
