import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.test.ts', 'test/unit/**/*.spec.ts'],
          environment: 'happy-dom',
        },
      },
      {
        test: {
          name: 'e2e',
          include: ['test/e2e/**/*.test.ts', 'test/e2e/**/*.spec.ts'],
          environment: 'node',
          testTimeout: 60000,
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.test.ts', 'test/nuxt/**/*.spec.ts'],
          environment: 'nuxt',
          testTimeout: 60000,
        },
      }),
    ],
  },
});
