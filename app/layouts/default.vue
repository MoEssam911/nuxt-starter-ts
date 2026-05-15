<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="app-shell">
    <header class="app-shell__header">
      <div class="app-shell__brand">
        <span class="app-shell__badge">Starter</span>
        <NuxtLinkLocale to="/">{{ t('common.appName') }}</NuxtLinkLocale>
      </div>

      <div class="starter-demo-actions">
        <UiLanguageSwitcher />
        <NuxtLinkLocale class="starter-demo-button" to="/example">
          {{ t('navigation.exampleModule') }}
        </NuxtLinkLocale>
        <UiThemeToggle />
      </div>
    </header>

    <slot />

    <UiToastProvider />
  </div>
</template>
