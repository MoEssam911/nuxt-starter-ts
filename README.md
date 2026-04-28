# Nuxt 4 TypeScript Modular Starter

This is a production-ready Nuxt 4 starter template using TypeScript, Tailwind CSS v4, and a Domain-Driven Design (Modular) architecture.

**Note for AI Assistants**: This document serves as a summary of the starter's current state. Use this to understand the established patterns, what has been completed, what is pending, and what needs improvement.

---

## 🚀 What is Done

### 1. Tech Stack & Core Configuration

- **Framework**: Nuxt 4 (`nuxt@^4.2.2`) with Vue 3 (`vue@^3.5.26`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) and `@nuxtjs/color-mode` for theming.
- **Type Safety**: TypeScript (`typescript@^5.9.3`) with strict mode enabled.
- **Linting & Formatting**: ESLint 9 (Flat Config), Prettier, Husky, and lint-staged for pre-commit hooks.

### 2. Architecture & Project Structure

Implemented a scalable, domain-driven directory structure inside the `app/` directory:

- **`app/core/`**: Contains global/shared utilities, composables (`useApi`, `useAuth`, `useTheme`), constants, and base types.
- **`app/modules/`**: Feature-based modules (e.g., `users/`) encapsulating their own composables, services, and types.
- **Path Aliases**: configured in `nuxt.config.ts` (`@core`, `@modules`, `@ui`, `@layouts`).
- **Auto-imports**: Explicitly configured for `core/composables`, `core/utils`, and `modules/**/composables`.

### 3. Theming & Styling System

- **CSS Architecture**: Organized in `app/assets/css/` (`main.css`, `fonts.css`, `theme.css`, `typography.css`).
- **Design Tokens**: Semantic CSS custom properties mapping to Tailwind utilities in `theme.css`. Includes comprehensive palettes (Primary, Secondary, Neutral, Success, Warning, Danger, Info).
- **Dark/Light Mode**: Fully integrated using `@nuxtjs/color-mode` with semantic token switching (`--text`, `--bg`, `--surface`, etc.).

### 4. Base Composables & Services

- **`useApi.ts`**: A generic fetch wrapper using Nuxt's `$fetch` or native `fetch`, injecting base URLs and throwing typed `ApiError`.
- **`useAuth.ts`**: Global authentication state management using `useState`.
- **`useTheme.ts`**: Helper for managing and toggling color modes.
- **`http.ts` & Services**: Authenticated HTTP client injecting Bearer tokens, with a sample `users.service.ts` demonstrating the pattern.

---

## 🎯 What is Next

These are the immediate next steps to make the starter fully functional for building features:

1. **Routing & Views**
   - Create the `app/pages/` directory and set up Vue Router integration.
   - Create the `app/layouts/` directory (e.g., `default.vue`, `auth.vue`).
2. **UI Components Library**
   - Build foundational UI components in `app/components/ui/` (e.g., `UiButton`, `UiInput`, `UiModal`) using Tailwind CSS v4.
3. **State Management**
   - Install and configure **Pinia** for complex global state management (beyond `useState`).
4. **Internationalization (i18n)**
   - Integrate `@nuxtjs/i18n` for multi-language support.
5. **Form Validation**
   - Add a robust form validation library like **VeeValidate** or **Zod** + **Nuxt UI** / **FormKit**.
6. **Authentication Flow**
   - Expand `useAuth` and `types/auth.ts` to handle complete login, register, logout, and token refresh logic.

---

## 🛠️ What Needs Improvement

Areas that have a basic implementation but require enhancement for production readiness:

1. **Error Handling & Interceptors**
   - The current `useApi` and `http.ts` wrappers are basic. They need robust error interception (e.g., handling 401 Unauthorized to trigger token refreshes or redirects).
2. **Environment Variable Validation**
   - Currently, env vars are loosely typed. Implement a validation schema (e.g., using `zod` or `@t3-oss/env-nuxt`) to ensure required variables exist at startup.
3. **Testing Setup**
   - No testing framework is currently installed. Need to configure **Vitest** for unit testing and **Playwright** or **Cypress** for E2E testing.
4. **SEO & Meta Tags**
   - Add default `useHead` or `useSeoMeta` configurations in `app.vue` or a global layout.
5. **Middleware**
   - Add Nuxt route middleware (`app/middleware/`) for route protection (e.g., `auth.global.ts`).

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Type check, lint, and format
npm run check
```
