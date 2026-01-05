// app/composables/useApi.ts
export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

export const useApi = async <T = unknown>(endpoint: string, options?: RequestInit): Promise<T> => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.VITE_API_BASE || '';

  const url = baseUrl + endpoint;

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
  } catch (err) {
    throw Object.assign(new Error('Network error') as ApiError, { data: err });
  }

  let data: T;
  try {
    data = await res.json();
  } catch {
    data = {} as T;
  }

  if (!res.ok) {
    throw Object.assign(new Error(`API Error: ${res.status} ${res.statusText}`) as ApiError, {
      status: res.status,
      data,
    });
  }

  return data;
};
