interface SeoOptions {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Sets page SEO meta tags with consistent title formatting.
 * Call once per page inside `<script setup>`.
 *
 * @example
 * useSeo({
 *   title: 'Dashboard',
 *   description: 'Overview of your account activity.',
 * })
 */
export const useSeo = (options: SeoOptions) => {
  const config = useRuntimeConfig();
  const fullTitle = `${options.title} — ${config.public.appName}`;

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: options.description,
    ogDescription: options.description,
    ogImage: options.image,
    robots: options.noIndex ? 'noindex,nofollow' : 'index,follow',
  });
};
