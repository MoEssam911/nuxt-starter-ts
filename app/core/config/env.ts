/**
 * Minimal runtime env validator for the starter.
 * Keep checks small so the starter remains flexible.
 */
export const validateEnv = () => {
  const runtime = useRuntimeConfig();
  const pub = (runtime?.public as Record<string, any>) || {};

  const apiBase = pub.apiBase as string | undefined;
  const appName = pub.appName as string | undefined;

  if (!apiBase || typeof apiBase !== 'string' || apiBase.trim() === '') {
    throw new Error('Missing runtime config: NUXT_PUBLIC_API_BASE (public.apiBase) is required');
  }

  if (!appName || typeof appName !== 'string' || appName.trim() === '') {
    throw new Error('Missing runtime config: NUXT_PUBLIC_APP_NAME (public.appName) is required');
  }

  return {
    apiBase,
    appName,
    appEnv: (pub.appEnv as string) || 'development',
  };
};
