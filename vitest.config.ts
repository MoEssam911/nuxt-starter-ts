import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'unit',
    include: ['test/unit/**/*.test.ts', 'test/unit/**/*.spec.ts'],
    environment: 'node',
  },
});
