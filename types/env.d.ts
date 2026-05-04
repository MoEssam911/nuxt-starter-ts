/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
}

declare const useHead: (input: Record<string, unknown>) => void;
declare const definePageMeta: (meta: Record<string, unknown>) => void;
declare const navigateTo: (to: string) => Promise<unknown> | unknown;
