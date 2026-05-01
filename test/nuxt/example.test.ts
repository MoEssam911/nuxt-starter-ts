import { describe, it, expect } from 'vitest';

describe('Nuxt Environment Test Example', () => {
  it('can access Nuxt runtime config', () => {
    const config = useRuntimeConfig();
    expect(config).toBeDefined();
  });
});
