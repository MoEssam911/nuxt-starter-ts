<script setup lang="ts">
withDefaults(
  defineProps<{
    kicker?: string;
    title: string;
    description?: string;
  }>(),
  {
    kicker: 'Feature module',
    description: '',
  },
);
</script>

<template>
  <header
    class="relative overflow-hidden rounded-3xl border border-primary-200/60 bg-linear-to-br from-primary-50 via-white to-info-50 p-6 shadow-sm dark:border-primary-800/60 dark:from-primary-950 dark:via-neutral-100 dark:to-info-950"
  >
    <div
      class="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary-300/30 blur-2xl dark:bg-primary-600/20"
    />

    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300"
    >
      {{ kicker }}
    </p>
    <h1 class="mt-2 text-2xl font-bold tracking-tight text-text sm:text-3xl">{{ title }}</h1>
    <p v-if="description" class="mt-3 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
      {{ description }}
    </p>

    <div v-if="$slots.actions" class="mt-5 flex flex-wrap items-center gap-3">
      <slot name="actions" />
    </div>
  </header>
</template>
