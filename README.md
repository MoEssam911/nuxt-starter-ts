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
- **Testing**: Vitest for unit testing with foundational test structure.

### 2. Architecture & Project Structure

Implemented a scalable, domain-driven, service-first directory structure inside the `app/` directory:

- **`app/core/`**: Centralized API client (`client.ts`), high-level composables (`useApi`, `useTheme`), composables auto-import, types, constants, and utilities.
- **`app/modules/`**: Feature-based modules (e.g., `example/`) with complete encapsulation: pages (auto-routed), components (auto-registered), services, and types.
  - Services follow a **service-only pattern** — no Pinia stores unless needed for global cross-module state.
  - Services consume the centralized API layer via `useApi()` and `useApiClient()`.
- **`app/pages/`**: Global pages (landing, 404, etc.).
- **`app/layouts/`**: Layout templates (`default.vue`, `auth.vue`).
- **`app/components/ui/`**: Reusable UI components (auto-registered).
- **Path Aliases**: configured in `nuxt.config.ts` (`@core`, `@modules`, `@ui`, `@layouts`).
- **Auto-imports**: Explicitly configured for `core/composables`, `core/utils`, and module-scoped patterns.
- **Auto-discovery**: Pages and components automatically discovered and registered without explicit imports.
- **Internationalization**: `@nuxtjs/i18n` is wired with locale-aware routes and modular locale discovery.

### 3. Theming & Styling System

- **CSS Architecture**: Organized in `app/assets/css/` (`main.css`, `fonts.css`, `theme.css`, `typography.css`).
- **Design Tokens**: Semantic CSS custom properties mapping to Tailwind utilities in `theme.css`. Includes comprehensive palettes (Primary, Secondary, Neutral, Success, Warning, Danger, Info).
- **Dark/Light Mode**: Fully integrated using `@nuxtjs/color-mode` with semantic token switching (`--text`, `--bg`, `--surface`, etc.).
- **Responsive**: Mobile-first responsive design patterns throughout all components.

### 4. API & Service Layer

- **`useApiClient.ts`**: Low-level HTTP transport with centralized error normalization.
  - `request<T>()`: Throws `ApiError` on failure (for non-critical code).
- **`useApi.ts`**: High-level composable for SSR-safe queries and mutations.
  - `get<T>()`: Uses `useAsyncData()` for server-rendered reads; returns `{ data, loading, error, execute, refresh, clear, status }`.
  - `post/put/patch/delete<T>()`: Mutation factory returning `{ data, loading, error, execute }`.
- **Service Pattern**: Features expose services (e.g., `useExampleService()`) that wrap API calls, normalize payloads, and handle business logic without throwing errors.
  - All services use the high-level `useApi()` composable for consistency.
  - Errors stored in refs; calling code checks `.error.value` for failures.
  - No try/catch in components or services — centralized error handling in client layer.

### 5. Example Module

A complete, copy-paste-able feature module demonstrating best practices:

- **Pages**: List (`index.vue`), Detail (`[id].vue`), Create/Edit (`create-edit.vue`) with route-aware state management.
- **Components**: `ExamplePageHeader`, `ExampleStateBlock`, `ExampleListTable`, `ExampleItemCard`, `ExampleItemForm` — all auto-registered.
- **Service**: `useExampleService()` wrapping JSONPlaceholder CRUD API.
- **Types**: Feature-scoped interfaces (`ExampleItem`, `ExampleFormValues`).
- **UI Patterns**: Responsive layouts, loading/error/empty states, form validation, toast notifications.

### 6. Modular i18n Layout

Translations follow the same modular structure as pages and components:

```text
locales/
├── en.json
└── ar.json

app/modules/[feature-name]/locales/
├── en.json
└── ar.json
```

The i18n loader scans these folders automatically, merges shared messages first, then applies module-specific overrides. Add a new module locale file and it is picked up without editing a central registry.

---

## 📋 How to Build a New Module

Use the example module as a template:

1. **Create folder structure**:

   ```text
   app/modules/[feature-name]/
   ├── pages/
   │   ├── index.vue          (list view)
   │   ├── [id].vue           (detail view)
   │   └── create-edit.vue    (create/edit form)
   ├── components/
   │   └── [FeatureName]*.vue (auto-registered, no imports)
   ├── services/
   │   └── [feature-name].service.ts
   └── types/
       └── [feature-name].types.ts
   ```

2. **Define types** in `types/[feature-name].types.ts`.

3. **Create service** in `services/[feature-name].service.ts`:

   ```typescript
   export const use[FeatureName]Service = () => {
     const api = useApi();
     return {
       getItems: () => api.get('/endpoint'),
       getItemById: (id) => api.get(`/endpoint/${id}`),
       createItem: () => api.post('/endpoint'),
       updateItem: (id) => api.put(`/endpoint/${id}`),
       deleteItem: (id) => api.delete(`/endpoint/${id}`),
     };
   };
   ```

4. **Build pages** using the service:
   - Always check `.error.value` after mutations.
   - Use `watch(route.params, ...)` to reload on route changes (prevents stale data).
   - Add loading, error, and empty states via `ExampleStateBlock`.

5. **Create components** in `components/` — they auto-register.

6. **Routes auto-discover**:
   - `pages/index.vue` → `/[feature-name]`
   - `pages/[id].vue` → `/[feature-name]/:id`
   - `pages/create-edit.vue` → `/[feature-name]/create-edit`

## 🎯 Next Steps for Production

1. **Internationalization (i18n)**
   - Integrate `@nuxtjs/i18n` for multi-language support.
2. **Advanced State Management**
   - Add **Pinia** if features need cross-module shared state (example uses service-only pattern for simplicity).
3. **Authentication**
   - Implement auth middleware and token refresh logic.
4. **End-to-End Tests**
   - Extend Vitest setup and add Playwright for E2E testing.
5. **SEO & Meta Tags**
   - Add default `useHead` configurations and route-specific meta tags.
6. **Error Tracking**
   - Integrate error logger (e.g., Sentry) for production monitoring.

---

## 🏗️ Architecture Principles

This starter follows these core principles:

1. **Service-First**: Business logic lives in services, not components. Services consume the centralized API layer.
2. **Error Handling Without Throws**: Services and components don't throw API errors; they store them in refs.
3. **Auto-Discovery**: Pages, components, and routes auto-register. Explicit imports are not required.
4. **Modular Design**: Features are self-contained modules. Each module is independently deployable and testable.
5. **Type Safety**: Strict TypeScript throughout. All API responses, service payloads, and component props are typed.
6. **Semantic Styling**: CSS custom properties tied to Tailwind utilities enable easy theming and dark mode.

## 📚 API Documentation

### useApiClient

Low-level HTTP transport with centralized error normalization.

```typescript
const { request } = useApiClient();

// Throws on error
const data = await request<T>(url, { method: 'GET' });
```

### useApi

High-level composable for queries (SSR-safe) and mutations.

```typescript
const api = useApi();

// SSR-safe queries
const { data, pending, error, refresh } = api.get<T>('/endpoint');

// Mutations
const mutation = api.post<T>('/endpoint');
await mutation.execute(payload);
if (mutation.error.value) {
  /* handle error */
}
```

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
