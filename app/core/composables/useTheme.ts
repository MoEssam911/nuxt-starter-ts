export type ThemeMode = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === 'dark');

  const theme = computed(() => colorMode.value as ThemeMode);

  const setTheme = (next: ThemeMode) => {
    if (next === 'system') {
      colorMode.preference = 'system';
    } else {
      colorMode.preference = next;
    }
  };

  const toggleTheme = () => {
    const nextMode: ThemeMode = isDark.value ? 'light' : 'dark';
    setTheme(nextMode);
  };

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    colorMode,
  };
};
