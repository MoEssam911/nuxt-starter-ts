<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue';

import { useToast } from '../../core/composables/useToast';

const toast = useToast();
const items = computed(() => toast.toasts.value);
const dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

watch(
  items,
  (currentItems) => {
    for (const item of currentItems) {
      if (dismissTimers.has(item.id)) continue;

      dismissTimers.set(
        item.id,
        setTimeout(() => {
          toast.remove(item.id);
          dismissTimers.delete(item.id);
        }, item.duration),
      );
    }
  },
  { deep: true, immediate: true },
);

onBeforeUnmount(() => {
  for (const timer of dismissTimers.values()) {
    clearTimeout(timer);
  }
  dismissTimers.clear();
});
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      name="toast"
      tag="div"
      class="ui-toast-stack"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <article
        v-for="item in items"
        :key="item.id"
        class="ui-toast"
        :data-type="item.type"
        role="status"
        aria-live="polite"
      >
        <span class="ui-toast__indicator" />

        <div>
          <p class="ui-toast__title">{{ item.title }}</p>
          <p v-if="item.message" class="ui-toast__message">{{ item.message }}</p>
        </div>

        <button
          class="ui-toast__close"
          type="button"
          aria-label="Dismiss toast"
          @click="toast.remove(item.id)"
        >
          ×
        </button>
      </article>
    </TransitionGroup>
  </Teleport>
</template>
