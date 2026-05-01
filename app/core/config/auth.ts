import { useRuntimeConfig } from '#app';

export interface AuthConfig {
  endpoints: {
    login: string;
    logout?: string | undefined;
    refresh?: string | undefined;
    me?: string | undefined;
  };
  storage: 'cookie' | 'localStorage' | 'sessionStorage';
  sessionTimeout?: number | undefined;
  cookieName?: string;
}

export const defaultAuthConfig: AuthConfig = {
  endpoints: {
    login: '/api/auth/login',
  },
  storage: 'cookie',
  sessionTimeout: undefined,
  cookieName: 'token',
};

export const getAuthConfig = (): AuthConfig => {
  const config = useRuntimeConfig();
  const publicCfg = (config?.public as Record<string, any>) || {};

  return {
    endpoints: {
      login: publicCfg.authLoginEndpoint || defaultAuthConfig.endpoints.login,
      logout: publicCfg.authLogoutEndpoint || undefined,
      refresh: publicCfg.authRefreshEndpoint || undefined,
      me: publicCfg.authMeEndpoint || undefined,
    },
    storage: (publicCfg.authStorage as AuthConfig['storage']) || defaultAuthConfig.storage,
    sessionTimeout: publicCfg.authSessionTimeout
      ? parseInt(publicCfg.authSessionTimeout)
      : undefined,
    cookieName: publicCfg.authCookieName || defaultAuthConfig.cookieName,
  };
};
