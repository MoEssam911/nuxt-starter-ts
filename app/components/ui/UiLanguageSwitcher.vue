<script setup lang="ts">
import { useSupportedLocales } from '../../core/composables/useSupportedLocales';

const { locales, t, isActiveLocale } = useSupportedLocales();
</script>

<template>
  <nav :aria-label="t('language.label')">
    <div
      class="inline-flex items-center gap-1 rounded-full border border-secondary-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,239,250,0.7))] p-1 shadow-[0_16px_34px_rgba(44,21,83,0.08)] backdrop-blur-xl dark:border-secondary-800/50 dark:bg-[linear-gradient(180deg,rgba(15,12,25,0.92),rgba(9,7,18,0.88))]"
    >
      <SwitchLocalePathLink
        v-for="item in locales"
        :key="item.code"
        :locale="item.code"
        class="inline-flex min-w-10 items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        :class="
          isActiveLocale(item.code)
            ? 'bg-linear-to-br from-primary to-secondary text-white shadow-[0_10px_24px_rgba(124,58,237,0.24)]'
            : 'text-text-muted hover:bg-secondary-50 hover:text-text dark:hover:bg-secondary-950/30'
        "
        :aria-current="isActiveLocale(item.code) ? 'page' : undefined"
        :aria-label="`${t('language.label')}: ${item.name}`"
      >
        <span class="ui-language-switcher__code" aria-hidden="true">
          {{ item.code.toUpperCase() }}
        </span>
      </SwitchLocalePathLink>
    </div>
  </nav>
</template>
