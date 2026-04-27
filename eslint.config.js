import withNuxt from './.nuxt/eslint.config.mjs';

import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default withNuxt(
  {
    // 1. Define your ignored folders
    ignores: ['node_modules', '.nuxt', '.output', 'dist', 'public'],
  },
  {
    // 2. Fix the 'URL is not defined' and browser globals
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // ✅ Prettier integration
      'prettier/prettier': 'error',

      // ✅ Your Custom TypeScript / Nuxt rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'vue/multi-word-component-names': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      'no-implicit-coercion': 'warn',

      // ✅ Module boundaries
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@modules/*/*'],
              message:
                'Do not import from another module directly. Use core/shared or same module only.',
            },
          ],
        },
      ],
    },
  },
  prettierConfig, // Always last to override other formatting rules
);
