import withNuxt from './.nuxt/eslint.config.mjs';

import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default withNuxt(
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist', 'public'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',

      // General
      'no-console': 'warn',
      'no-debugger': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      'no-implicit-coercion': 'warn',

      // Module boundaries — prevent cross-domain direct imports
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
  prettierConfig, // Always last — disables ESLint rules that conflict with Prettier
);
