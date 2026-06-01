export type ThemeMode = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === 'dark');
  const theme = computed(() => colorMode.value as ThemeMode);

  const setTheme = (next: ThemeMode) => {
    colorMode.preference = next;
  };

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark');
  };

  return { theme, isDark, setTheme, toggleTheme, colorMode };
};
