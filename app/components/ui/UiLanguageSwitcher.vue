<script setup lang="ts">
const { locales, t, isActiveLocale } = useSupportedLocales();
</script>

<template>
  <nav class="ui-language-switcher" :aria-label="t('language.label')">
    <span class="ui-language-switcher__label">{{ t('language.label') }}</span>

    <div class="ui-language-switcher__options">
      <SwitchLocalePathLink
        v-for="item in locales"
        :key="item.code"
        :locale="item.code"
        class="ui-language-switcher__option"
        :class="{ 'is-active': isActiveLocale(item.code) }"
        :aria-current="isActiveLocale(item.code) ? 'page' : undefined"
      >
        {{ item.name }}
      </SwitchLocalePathLink>
    </div>
  </nav>
</template>

<style scoped>
.ui-language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ui-language-switcher__label {
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ui-language-switcher__options {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}

.ui-language-switcher__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4.8rem;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.ui-language-switcher__option:hover,
.ui-language-switcher__option:focus-visible {
  background: var(--bg-secondary);
  color: var(--text);
  outline: none;
}

.ui-language-switcher__option.is-active {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow-sm);
}
</style>
