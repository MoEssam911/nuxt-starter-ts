<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: 'docs',
  title: 'Architecture',
});

useSeo({
  title: t('docs.sections.architecture.title'),
  description: t('docs.sections.architecture.pageDescription'),
});

const pillars = ['core', 'modules', 'pages', 'layouts'] as const;
</script>

<template>
  <article class="space-y-6">
    <section
      class="rounded-4xl border border-border/60 bg-surface/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-8"
    >
      <p
        class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
      >
        {{ $t('docs.sections.architecture.title') }}
      </p>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {{ $t('docs.sections.architecture.pageTitle') }}
      </h1>
      <p class="mt-4 max-w-3xl text-base leading-8 text-text-muted">
        {{ $t('docs.sections.architecture.pageDescription') }}
      </p>
    </section>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="pillar in pillars"
        :key="pillar"
        class="rounded-3xl border border-border/60 bg-surface/92 p-5"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300"
        >
          {{ $t(`docs.sections.architecture.pillars.${pillar}.title`) }}
        </p>
        <p class="mt-3 text-sm leading-6 text-text-muted">
          {{ $t(`docs.sections.architecture.pillars.${pillar}.description`) }}
        </p>
      </article>
    </section>

    <section
      class="rounded-4xl border border-border/60 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(20,184,166,0.08))] p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-7"
    >
      <h2 class="text-2xl font-semibold tracking-tight text-text">
        {{ $t('docs.sections.architecture.keepStable.title') }}
      </h2>
      <p class="mt-3 max-w-3xl text-base leading-8 text-text-muted">
        {{ $t('docs.sections.architecture.keepStable.description') }}
      </p>
    </section>
  </article>
</template>
