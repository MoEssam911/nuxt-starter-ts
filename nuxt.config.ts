import tailwindcss from '@tailwindcss/vite';

import { extendModulePages } from './app/core/config/module-pages';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/modules',
      pathPrefix: false,
      ignore: ['**/pages/**', '**/stores/**', '**/services/**', '**/types/**'],
    },
  ],

  imports: {
    dirs: ['core/composables', 'core/utils'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  hooks: {
    'pages:extend': extendModulePages,
  },

  modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@pinia/nuxt'],

  colorMode: {
    classSuffix: '',
    classPrefix: '',
    storageKey: 'starter-theme-mode',
  },

  eslint: {
    config: {
      stylistic: false, // Set to true if you want Nuxt's built-in stylistic rules
    },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Nuxt Starter',
      appEnv: process.env.NUXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'development',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
});
