<script setup lang="ts">
import { useTheme } from '../../core/composables/useTheme';

const { toggleTheme, isDark } = useTheme();
const { t } = useI18n();

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

const label = computed(() =>
  isMounted.value ? (isDark.value ? t('theme.light') : t('theme.dark')) : t('theme.toggle'),
);
</script>

<template>
  <button class="starter-demo-button" type="button" :aria-label="label" @click="toggleTheme()">
    {{ label }}
  </button>
</template>
