import { fileURLToPath } from 'node:url';

import { setup, $fetch } from '@nuxt/test-utils/e2e';
import { describe, it, expect } from 'vitest';

describe('E2E Test Example', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../', import.meta.url)),
    server: true,
  });

  it('renders the home page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/');
    expect(html).toContain('<html');
  });
});
