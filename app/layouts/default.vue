<script setup lang="ts">
const navItems = [
  { labelKey: 'navigation.home', to: 'index' },
  { labelKey: 'navigation.docs', to: 'docs-index' },
  { labelKey: 'navigation.exampleModule', to: 'example' },
] as const;
</script>

<template>
  <div class="relative isolate min-h-screen overflow-hidden bg-bg text-text">
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.52),transparent_22%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.08),transparent_20%),linear-gradient(180deg,rgba(8,16,25,0.74),transparent_24%)]"
    />

    <div class="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <header
        class="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/60 bg-surface/90 px-4 py-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5"
      >
        <div class="flex items-center gap-3 font-semibold">
          <span
            class="inline-flex items-center rounded-full border border-primary-200/80 bg-primary-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-700 dark:border-primary-800/60 dark:bg-primary-950/20 dark:text-primary-200"
          >
            Starter
          </span>
          <NuxtLinkLocale
            to="index"
            class="text-sm font-semibold tracking-tight text-text sm:text-base"
          >
            {{ $t('common.appName') }}
          </NuxtLinkLocale>
        </div>

        <nav class="flex flex-wrap items-center gap-2">
          <NuxtLinkLocale
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full border border-transparent px-3 py-2 text-sm font-medium text-text-muted transition hover:border-border/60 hover:bg-bg hover:text-text"
            active-class="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800/60 dark:bg-primary-950/20 dark:text-primary-200"
          >
            {{ $t(item.labelKey) }}
          </NuxtLinkLocale>
        </nav>

        <div class="flex flex-wrap items-center gap-2">
          <UiLanguageSwitcher />
          <UiThemeToggle />
        </div>
      </header>

      <main class="relative">
        <slot />
      </main>

      <UiToastProvider />
    </div>
  </div>
</template>
