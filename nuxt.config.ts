import tailwindcss from '@tailwindcss/vite';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'glob';

import { syncLocaleMessages } from './app/core/i18n/sync-locale-messages';

syncLocaleMessages();

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  srcDir: 'app/',
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
      ignore: ['**/pages/**', '**/stores/**', '**/services/**', '**/types/**', '**/composables/**'],
    },
  ],

  imports: {
    dirs: [
      'core/composables',
      'core/utils',
      'composables',
      'utils',
      'stores',
      'modules/*/stores',
      'modules/*/composables',
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],

  // Single hooks object — merged build hooks + pages:extend
  hooks: {
    'build:before': syncLocaleMessages,
    ready: syncLocaleMessages,
    'pages:extend'(pages) {
      const modulesRoot = resolve(__dirname, 'app/modules');
      if (!existsSync(modulesRoot)) return;

      for (const mod of readdirSync(modulesRoot)) {
        const pagesDir = resolve(modulesRoot, mod, 'pages');
        if (!existsSync(pagesDir)) continue;

        const relFiles = globSync('**/*.vue', { cwd: pagesDir });
        for (const relFile of relFiles) {
          const file = resolve(pagesDir, relFile);
          const segments = relFile.replace(/\\/g, '/').replace(/\.vue$/, '');
          const routePath =
            '/' +
            mod +
            '/' +
            segments
              .replace(/\/index$/, '')
              .replace(/^index$/, '')
              .replace(/\[(\w+)\]/g, ':$1');

          pages.push({
            name: `${mod}-${segments.replace(/\//g, '-')}`,
            path: routePath.replace(/\/$/, '') || '/' + mod,
            file,
          });
        }
      }
    },
  },

  i18n: {
    defaultLocale: 'en',
    defaultDirection: 'ltr',
    detectBrowserLanguage: false,
    strategy: 'prefix_except_default',
    lazy: false,
    langDir: '../i18n/locales/',
    locales: [
      { code: 'en', dir: 'ltr', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ar', dir: 'rtl', language: 'ar', name: 'العربية', file: 'ar.json' },
    ],
  },

  colorMode: {
    classSuffix: '',
    classPrefix: '',
    preference: 'system',
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
    // Server-only private keys — NEVER exposed to the browser.
    // Add secrets here: apiSecret, databaseUrl, jwtSecret, etc.
    // Access in server routes via: const { apiSecret } = useRuntimeConfig()
    // Example:
    // apiSecret: process.env.API_SECRET ?? '',

    public: {
      // Exposed to both server and client-side code. Never put secrets here.
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? '',
      appName: process.env.NUXT_PUBLIC_APP_NAME ?? 'Nuxt Starter',
      appEnv: process.env.NUXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? 'development',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  experimental: {
    typedPages: true, // Type-safe useRoute() params — zero runtime cost
    viewTransition: true, // Smooth page transitions via View Transitions API
  },
});
