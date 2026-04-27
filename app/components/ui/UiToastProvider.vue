<script setup lang="ts">
const toast = useToast();

const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
  success: { bg: 'bg-success-50', border: 'border-success', icon: '✓' },
  error: { bg: 'bg-danger-50', border: 'border-danger', icon: '✕' },
  info: { bg: 'bg-info-50', border: 'border-info', icon: 'ℹ' },
  warning: { bg: 'bg-warning-50', border: 'border-warning', icon: '⚠' },
};

const typeTextColor: Record<string, string> = {
  success: 'text-success',
  error: 'text-danger',
  info: 'text-info',
  warning: 'text-warning',
};

// Auto-dismiss timers
const dismissToast = (id: string, duration: number) => {
  setTimeout(() => {
    toast.remove(id);
  }, duration);
};

// Watch for new toasts and start their timers
watch(
  toast.toasts,
  (toasts) => {
    for (const t of toasts) {
      dismissToast(t.id, t.duration);
    }
  },
  { deep: true },
);
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-for="t in toast.toasts.value"
          :key="t.id"
          :class="[
            'pointer-events-auto flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 shadow-lg',
            'min-w-[320px] max-w-[420px] backdrop-blur-sm',
            typeStyles[t.type]?.bg,
            typeStyles[t.type]?.border,
          ]"
          role="alert"
        >
          <!-- Icon -->
          <span
            :class="[
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
              {
                'bg-success': t.type === 'success',
                'bg-danger': t.type === 'error',
                'bg-info': t.type === 'info',
                'bg-warning': t.type === 'warning',
              },
            ]"
          >
            {{ typeStyles[t.type]?.icon }}
          </span>

          <!-- Message -->
          <p :class="['flex-1 text-sm font-medium leading-snug', typeTextColor[t.type]]">
            {{ t.message }}
          </p>

          <!-- Close -->
          <button
            :class="[
              'shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100',
              typeTextColor[t.type],
            ]"
            aria-label="Dismiss"
            @click="toast.remove(t.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
