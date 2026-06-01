<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: 'docs',
  title: 'Getting Started',
});

useSeo({
  title: t('docs.sections.gettingStarted.title'),
  description: t('docs.sections.gettingStarted.pageDescription'),
});
</script>

<template>
  <article class="space-y-6">
    <section
      class="rounded-4xl border border-border/60 bg-surface/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-8"
    >
      <p
        class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
      >
        {{ $t('docs.sections.gettingStarted.title') }}
      </p>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {{ $t('docs.sections.gettingStarted.pageTitle') }}
      </h1>
      <p class="mt-4 max-w-3xl text-base leading-8 text-text-muted">
        {{ $t('docs.sections.gettingStarted.pageDescription') }}
      </p>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article class="rounded-3xl border border-border/60 bg-surface/92 p-5">
        <p class="text-sm font-semibold text-text">
          {{ $t('docs.sections.gettingStarted.steps.routes.title') }}
        </p>
        <p class="mt-2 text-sm leading-6 text-text-muted">
          {{ $t('docs.sections.gettingStarted.steps.routes.description') }}
        </p>
      </article>
      <article class="rounded-3xl border border-border/60 bg-surface/92 p-5">
        <p class="text-sm font-semibold text-text">
          {{ $t('docs.sections.gettingStarted.steps.services.title') }}
        </p>
        <p class="mt-2 text-sm leading-6 text-text-muted">
          {{ $t('docs.sections.gettingStarted.steps.services.description') }}
        </p>
      </article>
      <article class="rounded-3xl border border-border/60 bg-surface/92 p-5">
        <p class="text-sm font-semibold text-text">
          {{ $t('docs.sections.gettingStarted.steps.locale.title') }}
        </p>
        <p class="mt-2 text-sm leading-6 text-text-muted">
          {{ $t('docs.sections.gettingStarted.steps.locale.description') }}
        </p>
      </article>
    </section>
  </article>
</template>
