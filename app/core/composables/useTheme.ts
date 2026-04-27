// Theme composable - wraps @nuxtjs/color-mode
export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const colorMode = useColorMode();

  const theme = computed<Theme>(() => colorMode.value as Theme);

  const setTheme = (next: Theme) => {
    colorMode.preference = next;
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  const isDark = computed(() => theme.value === 'dark');

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
};
