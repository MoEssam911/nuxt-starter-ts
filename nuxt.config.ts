import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

import { extendModulePages } from './app/core/config/module-pages';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  nitro: {
    preset: 'netlify',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  pages: true,

  hooks: {
    'pages:extend': extendModulePages,
  },

  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@nuxt/test-utils/module',
  ],

  eslint: {
    config: {
      stylistic: false, // Set to true if you want Nuxt's built-in stylistic rules
    },
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'color-mode',
  },

  // Path aliases for modular architecture
  alias: {
    '@core': fileURLToPath(new URL('./app/core', import.meta.url)),
    '@modules': fileURLToPath(new URL('./app/modules', import.meta.url)),
    '@ui': fileURLToPath(new URL('./app/components/ui', import.meta.url)),
    '@layouts': fileURLToPath(new URL('./app/layouts', import.meta.url)),
  },

  // Auto-imports configuration
  imports: {
    dirs: ['core/composables', 'core/utils', 'core/api', 'modules/**/composables'],
  },

  // Components auto-import
  components: {
    dirs: [
      { path: '~/components/ui', prefix: 'Ui' },
      { path: '~/components', pathPrefix: false },
    ],
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (server-side only)
    apiSecret: '',

    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      VITE_API_BASE: process.env.VITE_API_BASE || '',
    },
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false,
  },
});
