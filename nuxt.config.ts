import tailwindcss from '@tailwindcss/vite';

import { createI18nModuleConfig } from './app/core/i18n/module-config';
import { syncLocaleMessages } from './app/core/i18n/sync-locale-messages';
import { extendModulePages } from './app/core/config/module-pages';

syncLocaleMessages();

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
    'build:before': syncLocaleMessages,
    'pages:extend': extendModulePages,
    ready: syncLocaleMessages,
  },

  modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@pinia/nuxt'],

  i18n: createI18nModuleConfig(),

  colorMode: {
    classSuffix: '',
    classPrefix: '',
    fallback: 'light',
    storage: 'cookie',
    storageKey: 'starter-theme-mode',
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

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
