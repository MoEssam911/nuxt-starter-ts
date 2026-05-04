import { validateEnv } from '~/core/config/env';

export default defineNuxtPlugin(() => {
  // Normalize runtime public config early so the app can render with safe defaults.
  validateEnv();
});
