<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <div
    class="relative isolate min-h-screen overflow-hidden bg-bg px-4 py-6 text-text sm:px-6 lg:px-8"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.45),transparent_24%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.08),transparent_22%),linear-gradient(180deg,rgba(8,16,25,0.78),transparent_24%)]"
    />

    <div class="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-lg flex-col justify-center">
      <div class="mb-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-3 rounded-full border border-border/60 bg-surface/90 px-4 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <span
            class="text-sm font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-200"
          >
            {{ config.public.appName }}
          </span>
        </NuxtLink>
      </div>

      <div
        class="rounded-3xl border border-border/60 bg-surface/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
