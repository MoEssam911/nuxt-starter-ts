<script setup lang="ts">
const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <button
    class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-bg text-text shadow-sm transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950/20 dark:hover:text-primary-200 cursor-pointer"
    type="button"
    :aria-label="$t('theme.toggle')"
    :title="$t('theme.toggle')"
    :aria-pressed="isDark"
    @click="toggleTheme()"
  >
    <svg
      class="h-5 w-5 transition-transform dark:hidden"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
      <path
        d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg
      class="hidden h-5 w-5 transition-transform dark:block"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
