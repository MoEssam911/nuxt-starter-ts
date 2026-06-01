<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: 'docs',
  title: 'Docs',
});

useSeo({
  title: t('docs.metaTitle'),
  description: t('docs.hero.description'),
});

const cards = ['service', 'forms', 'layouts', 'i18n'] as const;
</script>

<template>
  <div class="space-y-6 lg:space-y-8">
    <section
      class="overflow-hidden rounded-4xl border border-border/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.94)_48%,rgba(240,253,250,0.72))] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.06)] dark:bg-[linear-gradient(135deg,rgba(11,18,29,0.96),rgba(17,24,39,0.96)_52%,rgba(8,32,29,0.9))] sm:p-8"
    >
      <div class="max-w-3xl space-y-4">
        <p
          class="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-700 dark:text-secondary-300"
        >
          {{ $t('docs.hero.kicker') }}
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl">
          {{ $t('docs.hero.title') }}
        </h1>
        <p class="max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
          {{ $t('docs.hero.description') }}
        </p>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <NuxtLinkLocale
          to="docs-getting-started"
          class="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          {{ $t('docs.hero.primaryCta') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="docs-architecture"
          class="inline-flex items-center justify-center rounded-full border border-border/60 bg-bg px-5 py-3 text-sm font-semibold text-text transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950/20 dark:hover:text-primary-200"
        >
          {{ $t('docs.hero.secondaryCta') }}
        </NuxtLinkLocale>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in cards"
        :key="card"
        class="rounded-3xl border border-border/60 bg-surface/92 p-5 shadow-[0_16px_48px_rgba(15,23,42,0.05)]"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300"
        >
          {{ $t(`docs.cards.${card}.title`) }}
        </p>
        <p class="mt-3 text-sm leading-6 text-text-muted">
          {{ $t(`docs.cards.${card}.description`) }}
        </p>
      </article>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <article
        class="rounded-4xl border border-border/60 bg-surface/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-7"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
        >
          {{ $t('docs.sections.gettingStarted.title') }}
        </p>
        <h2 class="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {{ $t('docs.sections.gettingStarted.description') }}
        </h2>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <article class="rounded-2xl border border-border/60 bg-bg/80 p-4">
            <p class="text-sm font-semibold text-text">
              {{ $t('docs.sections.gettingStarted.cards.layout.title') }}
            </p>
            <p class="mt-2 text-sm leading-6 text-text-muted">
              {{ $t('docs.sections.gettingStarted.cards.layout.description') }}
            </p>
          </article>
          <article class="rounded-2xl border border-border/60 bg-bg/80 p-4">
            <p class="text-sm font-semibold text-text">
              {{ $t('docs.sections.gettingStarted.cards.meta.title') }}
            </p>
            <p class="mt-2 text-sm leading-6 text-text-muted">
              {{ $t('docs.sections.gettingStarted.cards.meta.description') }}
            </p>
          </article>
        </div>
      </article>

      <article
        class="rounded-4xl border border-border/60 bg-surface/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-7"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
        >
          {{ $t('docs.overview.title') }}
        </p>
        <p class="mt-3 text-lg leading-8 text-text-muted">
          {{ $t('docs.overview.description') }}
        </p>

        <div
          class="mt-6 rounded-2xl border border-primary-200/60 bg-primary-50/60 p-4 dark:border-primary-800/60 dark:bg-primary-950/20"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-200"
          >
            {{ $t('docs.useCase.title') }}
          </p>
          <p class="mt-2 text-sm leading-6 text-text-muted">
            {{ $t('docs.useCase.description') }}
          </p>
        </div>
      </article>
    </section>

    <section
      class="rounded-4xl border border-border/60 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(20,184,166,0.08))] p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-7"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="max-w-2xl space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
          >
            Next step
          </p>
          <h2 class="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {{ $t('docs.useCase.cta') }}
          </h2>
        </div>

        <NuxtLinkLocale
          to="docs-architecture"
          class="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          {{ $t('docs.useCase.button') }}
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>
