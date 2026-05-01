import { validateEnv } from '~/core/config/env';

export default defineNuxtPlugin(() => {
  // Validate runtime public config on startup; throws if required values missing.
  validateEnv();
});
