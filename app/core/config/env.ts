export const validateEnv = () => {
  const config = useRuntimeConfig();

  const required: Array<{ key: keyof typeof config.public; label: string }> = [
    { key: 'apiBase', label: 'NUXT_PUBLIC_API_BASE' },
    { key: 'appName', label: 'NUXT_PUBLIC_APP_NAME' },
  ];

  const missing: string[] = [];

  for (const { key, label } of required) {
    const value = config.public[key];
    if (!value || String(value).trim() === '') {
      missing.push(label);
    }
  }

  if (missing.length > 0) {
    const message = `[env] Missing required environment variables: ${missing.join(', ')}`;
    if (config.public.appEnv === 'production') {
      throw new Error(message);
    } else {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  }
};
