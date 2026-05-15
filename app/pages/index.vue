<script setup lang="ts">
// Keep the starter page static and generic.
</script>

<template>
  <main class="starter-shell">
    <section class="starter-card">
      <p class="starter-kicker">Nuxt v4 starter</p>
      <h1>Nuxt Starter</h1>
      <p class="starter-copy">
        A clean, generic foundation for new projects. The base app stays minimal so every team can
        extend it without undoing starter assumptions.
      </p>

      <dl class="starter-meta">
        <div>
          <dt>Environment</dt>
          <dd>Configured by env files</dd>
        </div>
        <div>
          <dt>Runtime</dt>
          <dd>Nuxt 4 + Vue 3</dd>
        </div>
        <div>
          <dt>State</dt>
          <dd>Ready for project-specific setup</dd>
        </div>
        <div>
          <dt>Example module</dt>
          <dd>
            <NuxtLinkLocale
              class="text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
              to="/example"
            >
              API template route
            </NuxtLinkLocale>
          </dd>
        </div>
      </dl>
    </section>
  </main>
</template>
