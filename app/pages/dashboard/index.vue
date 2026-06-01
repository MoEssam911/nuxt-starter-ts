<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
});

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="mx-auto w-full max-w-400 px-4 pb-8 sm:px-6 lg:px-8">
    <div
      class="rounded-[1.75rem] border border-border/60 bg-surface/90 p-6 shadow-[0_16px_48px_rgba(7,16,24,0.06)] backdrop-blur-xl sm:p-8"
    >
      <p
        class="inline-flex items-center rounded-full border border-secondary-200/70 bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-800 dark:border-secondary-800/60 dark:bg-secondary-950/20 dark:text-secondary-200"
      >
        shadcn-vue + theming
      </p>
      <h1 class="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">Dashboard</h1>
      <p class="mt-3 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
        Button variants and dark-mode toggle — proof that the shadcn-vue component system and CSS
        token theming work end-to-end.
      </p>

      <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div class="rounded-3xl border border-border/60 bg-bg/80 p-5">
          <p class="mb-4 text-sm font-semibold text-text">Variants</p>
          <div class="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div class="rounded-3xl border border-border/60 bg-bg/80 p-5">
          <p class="mb-4 text-sm font-semibold text-text">Sizes</p>
          <div class="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div class="rounded-3xl border border-border/60 bg-bg/80 p-5 md:col-span-2 xl:col-span-1">
          <p class="mb-4 text-sm font-semibold text-text">Dark mode</p>
          <Button
            variant="outline"
            class="w-full justify-center border-border/60 bg-bg"
            @click="toggleTheme"
          >
            {{ isDark ? '☀ Switch to Light' : '☾ Switch to Dark' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
