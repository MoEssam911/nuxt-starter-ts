<template>
  <main class="error-shell">
    <section class="error-card">
      <p class="error-card__code">Error</p>
      <h1>Something went wrong</h1>
      <p class="error-card__message">
        The page could not be rendered. Please return to the homepage and try again.
      </p>

      <NuxtLinkLocale class="error-card__action" to="/">Go home</NuxtLinkLocale>
    </section>
  </main>
</template>
