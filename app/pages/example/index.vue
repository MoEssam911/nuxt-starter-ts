<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  title: 'Example',
});

useSeo({
  title: t('example.metaTitle'),
  description: t('example.hero.description'),
});

const structureKeys = ['core', 'modules', 'pages', 'layouts'] as const;
const principleKeys = ['serviceFirst', 'typedData', 'pageMeta', 'rtl', 'i18n', 'theme'] as const;
const routeKeys = ['home', 'showcase', 'dashboard', 'auth'] as const;
</script>

<template>
  <main class="relative isolate overflow-hidden bg-bg">
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_20%,rgba(37,99,235,0.15),transparent_24%),radial-gradient(circle_at_92%_8%,rgba(20,184,166,0.11),transparent_18%)] dark:bg-[radial-gradient(circle_at_8%_20%,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_92%_8%,rgba(45,212,191,0.08),transparent_18%)]"
    />

    <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section class="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <article
          class="rounded-4xl border border-border/60 bg-[linear-gradient(180deg,rgba(11,18,29,0.96),rgba(15,23,42,0.93))] p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:p-7"
        >
          <div
            class="inline-flex w-fit rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70"
          >
            {{ $t('example.hero.kicker') }}
          </div>
          <h1 class="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {{ $t('example.hero.title') }}
          </h1>
          <p class="mt-4 max-w-md text-sm leading-7 text-white/68">
            {{ $t('example.hero.description') }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLinkLocale
              to="docs"
              class="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-secondary-300"
            >
              {{ $t('example.hero.primaryCta') }}
            </NuxtLinkLocale>
            <a
              href="#structure"
              class="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-secondary-200/50 hover:bg-white/12"
            >
              {{ $t('example.hero.secondaryCta') }}
            </a>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p class="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                {{ $t('example.hero.cards.routes.title') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-white/80">
                {{ $t('example.hero.cards.routes.description') }}
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p class="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                {{ $t('example.hero.cards.rules.title') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-white/80">
                {{ $t('example.hero.cards.rules.description') }}
              </p>
            </div>
          </div>
        </article>

        <article
          id="structure"
          class="rounded-4xl border border-border/60 bg-surface/90 p-6 shadow-[0_16px_48px_rgba(7,16,24,0.06)] sm:p-7"
        >
          <div class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
              >
                {{ $t('example.structureTitle') }}
              </p>
              <h2 class="mt-3 text-2xl font-semibold tracking-tight text-text">
                {{ $t('example.structureDescription') }}
              </h2>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <article
                v-for="structureKey in structureKeys"
                :key="structureKey"
                class="rounded-2xl border border-border/60 bg-bg/70 p-4"
              >
                <p class="text-sm font-semibold text-text">
                  {{ $t(`example.structure.${structureKey}.label`) }}
                </p>
                <p class="mt-2 text-sm leading-6 text-text-muted">
                  {{ $t(`example.structure.${structureKey}.description`) }}
                </p>
              </article>
            </div>
          </div>

          <div class="mt-6 grid gap-3 lg:grid-cols-2">
            <article
              class="rounded-2xl border border-secondary-200/60 bg-secondary-50/60 p-4 dark:border-secondary-800/50 dark:bg-secondary-950/20"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300"
              >
                {{ $t('example.principlesTitle') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-text-muted">
                {{ $t('example.principlesDescription') }}
              </p>
            </article>
            <article
              class="rounded-2xl border border-primary-200/60 bg-primary-50/60 p-4 dark:border-primary-800/50 dark:bg-primary-950/20"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300"
              >
                {{ $t('example.runtimeTitle') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-text-muted">
                {{ $t('example.runtimeDescription') }}
              </p>
            </article>
          </div>
        </article>
      </section>

      <section
        class="rounded-4xl border border-border/60 bg-surface/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-7"
      >
        <div class="max-w-3xl space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
          >
            {{ $t('example.usageTitle') }}
          </p>
          <h2 class="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {{ $t('example.usageDescription') }}
          </h2>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="principleKey in principleKeys"
            :key="principleKey"
            class="rounded-3xl border border-border/60 bg-bg/70 p-5 shadow-[0_16px_48px_rgba(7,16,24,0.06)]"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              {{ $t(`example.principles.${principleKey}.title`) }}
            </p>
            <p class="mt-3 text-sm leading-6 text-text-muted">
              {{ $t(`example.principles.${principleKey}.description`) }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="routeKey in routeKeys"
          :key="routeKey"
          class="rounded-3xl border border-border/60 bg-surface/90 p-5 shadow-[0_16px_48px_rgba(7,16,24,0.06)]"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300"
          >
            {{ $t(`example.routes.${routeKey}.title`) }}
          </p>
          <p class="mt-3 text-sm leading-6 text-text-muted">
            {{ $t(`example.routes.${routeKey}.description`) }}
          </p>
        </article>
      </section>

      <section
        class="rounded-4xl border border-border/60 bg-[linear-gradient(135deg,rgba(37,99,235,0.1),rgba(20,184,166,0.1))] p-6 shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:p-8"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="max-w-2xl space-y-2">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300"
            >
              {{ $t('example.ctaTitle') }}
            </p>
            <h2 class="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              {{ $t('example.ctaDescription') }}
            </h2>
          </div>

          <NuxtLinkLocale
            to="docs"
            class="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-500"
          >
            {{ $t('example.ctaPrimary') }}
          </NuxtLinkLocale>
        </div>
      </section>
    </div>
  </main>
</template>
