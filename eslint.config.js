import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist', 'public'],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // Vue
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',

        // Nuxt
        useState: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useRuntimeConfig: 'readonly',
        defineNuxtConfig: 'readonly',

        // Nuxt modules
        useColorMode: 'readonly',

        // Node / Env
        process: 'readonly',

        // Browser globals
        console: 'readonly',
        fetch: 'readonly',
        RequestInit: 'readonly',
        Response: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // eslint-disable-next-line no-undef
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // eslint-disable-next-line no-undef
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
