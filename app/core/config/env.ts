import { useRuntimeConfig } from '#app/nuxt';

interface RuntimePublicEnv {
  apiBase?: string;
  appName?: string;
  appEnv?: string;
}

export const validateEnv = () => {
  const runtime = useRuntimeConfig();
  const pub = (runtime.public as RuntimePublicEnv) || {};

  if (!pub.apiBase || pub.apiBase.trim() === '') {
    throw new Error('Missing runtime config: NUXT_PUBLIC_API_BASE (public.apiBase) is required');
  }

  if (!pub.appName || pub.appName.trim() === '') {
    throw new Error('Missing runtime config: NUXT_PUBLIC_APP_NAME (public.appName) is required');
  }

  return {
    apiBase: pub.apiBase,
    appName: pub.appName,
    appEnv: pub.appEnv || 'development',
  };
};
