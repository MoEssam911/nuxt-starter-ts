<script setup lang="ts">
import { useToast } from '~/core/composables/useToast';
import { useUsers } from '~/modules/users/services/users.service';

definePageMeta({
  // middleware: 'auth', // Disabled for the public example to work without login
});

const toast = useToast();

// Use the SSR-safe, reactive, cached fetch from the users module
const { data: users, loading, error, refresh } = useUsers();
</script>

<template>
  <div class="min-h-screen bg-bg text-text">
    <main class="container mx-auto p-4 space-y-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-surface rounded-lg p-6 border border-border shadow-sm">
          <h2 class="text-2xl font-bold mb-2">Welcome to your Enterprise Starter</h2>
          <p class="text-text-muted mb-6">
            This template includes modular architecture, comprehensive theming, and enterprise-grade
            tooling.
          </p>

          <div class="grid gap-4 md:grid-cols-3 mt-6">
            <div
              class="p-4 bg-bg rounded border border-border hover:border-primary transition-colors"
            >
              <h3 class="font-medium text-primary flex items-center gap-2">
                <span class="text-xl">📁</span> Modular Architecture
              </h3>
              <p class="text-sm text-text-muted mt-2">
                Feature-based modules in <code>app/modules/</code>
              </p>
            </div>
            <div
              class="p-4 bg-bg rounded border border-border hover:border-secondary transition-colors"
            >
              <h3 class="font-medium text-secondary flex items-center gap-2">
                <span class="text-xl">🎨</span> Theming System
              </h3>
              <p class="text-sm text-text-muted mt-2">Light/dark mode with CSS custom properties</p>
            </div>
            <div
              class="p-4 bg-bg rounded border border-border hover:border-success transition-colors"
            >
              <h3 class="font-medium text-success flex items-center gap-2">
                <span class="text-xl">✅</span> Type Safety
              </h3>
              <p class="text-sm text-text-muted mt-2">Strict TypeScript with comprehensive types</p>
            </div>
          </div>
        </div>
      </div>

      <!-- API & Toast Examples Section -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-surface rounded-lg p-6 border border-border shadow-sm">
          <h2 class="text-xl font-bold mb-4 border-b border-border pb-2">Examples: API & Toasts</h2>

          <div class="grid gap-8 md:grid-cols-2">
            <!-- Toast Examples -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Toast Notifications</h3>
              <p class="text-sm text-text-muted mb-4">
                Click the buttons to test the global toast system.
              </p>

              <div class="flex flex-wrap gap-3">
                <button
                  class="px-4 py-2 bg-success text-white rounded hover:opacity-90 transition-opacity text-sm font-medium"
                  @click="toast.success('Action completed successfully!')"
                >
                  Success Toast
                </button>
                <button
                  class="px-4 py-2 bg-error text-white rounded hover:opacity-90 transition-opacity text-sm font-medium"
                  @click="toast.error('An error occurred while saving.')"
                >
                  Error Toast
                </button>
                <button
                  class="px-4 py-2 bg-info text-white rounded hover:opacity-90 transition-opacity text-sm font-medium"
                  @click="toast.info('Here is some useful information.')"
                >
                  Info Toast
                </button>
                <button
                  class="px-4 py-2 bg-warning text-white rounded hover:opacity-90 transition-opacity text-sm font-medium"
                  @click="toast.warning('Warning: You are about to delete a file.')"
                >
                  Warning Toast
                </button>
              </div>
            </div>

            <!-- API Fetch Example -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-semibold">API Fetching</h3>
                <button
                  :disabled="loading"
                  class="px-3 py-1 bg-primary text-white rounded hover:opacity-90 transition-opacity text-xs font-medium disabled:opacity-50"
                  @click="refresh()"
                >
                  {{ loading ? 'Loading...' : 'Refresh Data' }}
                </button>
              </div>
              <p class="text-sm text-text-muted mb-4">Fetching mock users from API.</p>

              <div v-if="loading && !users?.length" class="text-center py-8">
                <div
                  class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
                ></div>
              </div>

              <div
                v-else-if="error"
                class="p-4 bg-error/10 text-error rounded border border-error/20"
              >
                {{ error.message || 'Failed to fetch users' }}
              </div>

              <ul
                v-else-if="users"
                class="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar"
              >
                <li
                  v-for="user in users"
                  :key="user.id"
                  class="p-3 bg-bg border border-border rounded flex flex-col"
                >
                  <span class="font-medium">{{ user.name }}</span>
                  <span class="text-sm text-text-muted">{{ user.email }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 10px;
}
</style>
