import { useRuntimeConfig } from '#app/nuxt';

interface RuntimePublicEnv {
  apiBase?: string;
  appName?: string;
  appEnv?: string;
}

export const validateEnv = () => {
  const runtime = useRuntimeConfig();
  const pub = (runtime.public as RuntimePublicEnv) || {};

  return {
    apiBase: pub.apiBase || '',
    appName: pub.appName || 'Nuxt Starter',
    appEnv: pub.appEnv || 'development',
  };
};
