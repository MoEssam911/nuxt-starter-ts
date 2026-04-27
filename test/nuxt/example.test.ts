import { describe, it, expect } from 'vitest';

import { useRuntimeConfig } from '#imports';

describe('Nuxt Environment Test Example', () => {
  it('can access Nuxt runtime config', () => {
    const config = useRuntimeConfig();
    expect(config).toBeDefined();
  });
});
