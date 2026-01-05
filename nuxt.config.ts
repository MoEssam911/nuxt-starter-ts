import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    preference: 'light', // default theme
    fallback: 'light', // SSR fallback
    classSuffix: '', // use .dark/.light
    storageKey: 'color-mode', // persist automatically
  },
});
