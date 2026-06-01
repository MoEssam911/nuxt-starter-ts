<script setup lang="ts">
const navItems = [
  { labelKey: 'docs.layout.nav.overview', to: '/docs' },
  { labelKey: 'docs.layout.nav.gettingStarted', to: '/docs/getting-started' },
  { labelKey: 'docs.layout.nav.architecture', to: '/docs/architecture' },
  { labelKey: 'docs.layout.nav.usage', to: '/docs/usage' },
] as const;
</script>

<template>
  <div class="relative isolate min-h-screen overflow-hidden bg-bg text-text">
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.52),transparent_20%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.1),transparent_22%),linear-gradient(180deg,rgba(8,16,25,0.82),transparent_22%)]"
    />

    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <header
        class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/60 bg-surface/90 px-4 py-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5"
      >
        <div class="flex items-center gap-3">
          <span
            class="inline-flex items-center rounded-full border border-primary-200/80 bg-primary-50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary-700 dark:border-primary-800/60 dark:bg-primary-950/20 dark:text-primary-200"
          >
            {{ $t('docs.layout.badge') }}
          </span>
          <NuxtLinkLocale to="index" class="text-sm font-semibold tracking-tight text-text">
            {{ $t('common.appName') }}
          </NuxtLinkLocale>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <NuxtLinkLocale
            to="index"
            class="inline-flex items-center justify-center rounded-full border border-border/60 bg-bg px-4 py-2 text-sm font-semibold text-text shadow-sm transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950/20 dark:hover:text-primary-200"
          >
            {{ $t('navigation.home') }}
          </NuxtLinkLocale>
          <UiLanguageSwitcher />
          <UiThemeToggle />
        </div>
      </header>

      <div class="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside class="lg:sticky lg:top-6 lg:h-fit">
          <div
            class="rounded-3xl border border-border/60 bg-surface/90 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
              {{ $t('docs.layout.title') }}
            </p>
            <nav class="mt-4 grid gap-2">
              <NuxtLinkLocale
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="rounded-2xl border border-transparent px-3 py-2 text-sm font-medium text-text-muted transition hover:border-border/60 hover:bg-bg hover:text-text"
                active-class="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800/60 dark:bg-primary-950/20 dark:text-primary-200"
              >
                {{ $t(item.labelKey) }}
              </NuxtLinkLocale>
            </nav>

            <div class="mt-6 rounded-2xl border border-border/60 bg-bg/80 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {{ $t('docs.layout.starterLabel') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-text-muted">
                {{ $t('docs.layout.starterDescription') }}
              </p>
            </div>
          </div>
        </aside>

        <main class="min-w-0">
          <slot />
        </main>
      </div>

      <UiToastProvider />
    </div>
  </div>
</template>
