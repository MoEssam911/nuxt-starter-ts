// app/composables/useTheme.ts
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

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
