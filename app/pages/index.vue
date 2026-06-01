<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  title: 'Landing',
});

useSeo({
  title: t('landing.metaTitle'),
  description: t('landing.hero.description'),
});

const metricKeys = ['runtime', 'stack', 'safety', 'delivery'] as const;
const featureKeys = ['api', 'modules', 'forms', 'theme', 'i18n', 'auth', 'seo', 'testing'] as const;
const architectureKeys = ['core', 'modules', 'pages', 'layouts'] as const;
const stackKeys = ['nuxt', 'typescript', 'tailwind', 'i18n', 'auth', 'testing'] as const;
</script>

<template>
  <main class="relative isolate overflow-hidden bg-bg">
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(37,99,235,0.16),transparent_24%),radial-gradient(circle_at_88%_4%,rgba(20,184,166,0.12),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent_22%)] dark:bg-[radial-gradient(circle_at_10%_8%,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_88%_4%,rgba(45,212,191,0.1),transparent_18%),linear-gradient(180deg,rgba(8,16,25,0.62),transparent_22%)]"
    />

    <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section
        class="relative overflow-hidden rounded-4xl border border-border/60 bg-[linear-gradient(145deg,rgba(11,18,29,0.98),rgba(15,23,42,0.96)_48%,rgba(37,99,235,0.2)_78%,rgba(20,184,166,0.14))] p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-40"
        />
        <div class="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div class="space-y-6">
            <div
              class="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur"
            >
              {{ $t('landing.hero.kicker') }}
            </div>

            <div class="space-y-4">
              <h1
                class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl"
              >
                {{ $t('landing.hero.title') }}
              </h1>
              <p class="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                {{ $t('landing.hero.description') }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <NuxtLinkLocale
                to="docs"
                class="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-secondary-300"
              >
                {{ $t('landing.hero.primaryCta') }}
              </NuxtLinkLocale>
              <NuxtLinkLocale
                to="example"
                class="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-primary-200/50 hover:bg-white/12"
              >
                {{ $t('landing.hero.secondaryCta') }}
              </NuxtLinkLocale>
              <a
                href="#architecture"
                class="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-secondary-200/50 hover:bg-white/12"
              >
                {{ $t('landing.hero.anchorCta') }}
              </a>
            </div>

            <p class="max-w-2xl text-sm leading-6 text-white/55">
              {{ $t('landing.hero.note') }}
            </p>
          </div>

          <div
            class="grid gap-4 rounded-4xl border border-white/12 bg-white/8 p-4 backdrop-blur sm:grid-cols-2 lg:p-5"
          >
            <article
              v-for="metricKey in metricKeys"
              :key="metricKey"
              class="rounded-2xl border border-white/10 bg-neutral-950/25 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.18)]"
            >
              <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                {{ $t(`landing.metrics.${metricKey}.label`) }}
              </p>
              <p class="mt-3 text-lg font-semibold text-white">
                {{ $t(`landing.metrics.${metricKey}.value`) }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="features" class="scroll-mt-24 space-y-5">
        <div class="max-w-3xl space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
          >
            {{ $t('landing.featuresTitle') }}
          </p>
          <h2 class="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {{ $t('landing.featuresDescription') }}
          </h2>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="featureKey in featureKeys"
            :key="featureKey"
            class="group rounded-3xl border border-border/60 bg-surface/90 p-5 shadow-[0_16px_48px_rgba(7,16,24,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(7,16,24,0.12)]"
          >
            <div class="flex items-center gap-3">
              <span
                class="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_0_6px_rgba(243,174,63,0.18)]"
              />
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {{ $t(`landing.features.${featureKey}.eyebrow`) }}
              </p>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-text">
              {{ $t(`landing.features.${featureKey}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-text-muted">
              {{ $t(`landing.features.${featureKey}.description`) }}
            </p>
          </article>
        </div>
      </section>

      <section id="architecture" class="scroll-mt-24 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <article
          class="rounded-4xl border border-border/60 bg-surface/90 p-6 shadow-[0_16px_48px_rgba(7,16,24,0.06)] sm:p-7"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
          >
            {{ $t('landing.architectureTitle') }}
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {{ $t('landing.architectureDescription') }}
          </h2>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <article
              v-for="architectureKey in architectureKeys"
              :key="architectureKey"
              class="rounded-3xl border border-border/60 bg-bg/70 p-4"
            >
              <p class="text-sm font-semibold text-text">
                {{ $t(`landing.architecture.${architectureKey}.title`) }}
              </p>
              <p class="mt-2 text-sm leading-6 text-text-muted">
                {{ $t(`landing.architecture.${architectureKey}.description`) }}
              </p>
            </article>
          </div>
        </article>

        <article
          class="rounded-4xl border border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(239,246,255,0.76))] p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] sm:p-7 dark:bg-[linear-gradient(180deg,rgba(11,18,29,0.92),rgba(8,16,25,0.96))]"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
          >
            {{ $t('landing.stackTitle') }}
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {{ $t('landing.stackDescription') }}
          </h2>

          <div class="mt-6 flex flex-wrap gap-3">
            <span
              v-for="stackKey in stackKeys"
              :key="stackKey"
              class="rounded-full border border-border bg-bg px-4 py-2 text-sm font-semibold text-text-muted"
            >
              {{ $t(`landing.stack.${stackKey}`) }}
            </span>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div
              class="rounded-2xl border border-secondary-200/60 bg-secondary-50/70 p-4 dark:border-secondary-800/60 dark:bg-secondary-950/20"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300"
              >
                {{ $t('landing.stack.serviceFirst.title') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-text-muted">
                {{ $t('landing.stack.serviceFirst.description') }}
              </p>
            </div>
            <div
              class="rounded-2xl border border-primary-200/60 bg-primary-50/70 p-4 dark:border-primary-800/60 dark:bg-primary-950/20"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300"
              >
                {{ $t('landing.stack.localeAware.title') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-text-muted">
                {{ $t('landing.stack.localeAware.description') }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        class="rounded-3xl border border-border/60 bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(243,174,63,0.12))] p-6 shadow-[0_16px_48px_rgba(44,21,83,0.08)] sm:p-8"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="max-w-2xl space-y-2">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
            >
              {{ $t('landing.ctaTitle') }}
            </p>
            <h2 class="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              {{ $t('landing.ctaDescription') }}
            </h2>
          </div>

          <NuxtLinkLocale
            to="docs"
            class="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-500"
          >
            {{ $t('landing.ctaPrimary') }}
          </NuxtLinkLocale>
        </div>
      </section>
    </div>
  </main>
</template>
