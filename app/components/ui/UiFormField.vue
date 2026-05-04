<script setup lang="ts">
import { computed, useSlots } from 'vue';

type UiFormFieldAs = 'input' | 'textarea' | 'select';

type UiFormFieldOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    description?: string;
    error?: string | null;
    required?: boolean;
    hint?: string;
    as?: UiFormFieldAs;
    type?: string;
    modelValue?: string | number | null;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    options?: UiFormFieldOption[];
  }>(),
  {
    description: undefined,
    error: null,
    required: false,
    label: undefined,
    hint: undefined,
    as: 'input',
    type: 'text',
    modelValue: '',
    placeholder: undefined,
    rows: 3,
    disabled: false,
    options: () => [],
  },
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number | null): void;
}>();

const slots = useSlots();

const baseId = `field-${props.name}`;
const labelId = `${baseId}-label`;
const descriptionId = `${baseId}-description`;
const errorId = `${baseId}-error`;

const hasError = computed(() => Boolean(props.error));
const describedBy = computed(() => {
  const ids = [];
  if (props.description) ids.push(descriptionId);
  if (hasError.value) ids.push(errorId);
  return ids.join(' ') || undefined;
});

const fieldShellClasses =
  'rounded-2xl border border-slate-200 bg-white p-1 shadow-sm transition dark:border-slate-700 dark:bg-slate-900/70';

const controlClasses =
  'block w-full rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-100 dark:placeholder:text-slate-500';

const controlAttrs = computed(() => ({
  id: baseId,
  name: props.name,
  required: props.required,
  disabled: props.disabled,
  'aria-invalid': hasError.value || undefined,
  'aria-describedby': describedBy.value,
}));

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="grid gap-2">
    <label
      v-if="label"
      :id="labelId"
      :for="baseId"
      class="text-sm font-semibold text-slate-900 dark:text-slate-100"
    >
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>

    <slot
      v-if="slots.default"
      :id="baseId"
      :name="name"
      :label-id="labelId"
      :description-id="descriptionId"
      :error-id="errorId"
      :described-by="describedBy"
      :has-error="hasError"
      :control-attrs="controlAttrs"
      :field-shell-classes="fieldShellClasses"
      :control-classes="controlClasses"
    />

    <div v-else :class="fieldShellClasses">
      <component
        :is="as"
        v-bind="controlAttrs"
        :class="controlClasses"
        :type="as === 'input' ? type : undefined"
        :rows="as === 'textarea' ? rows : undefined"
        :value="modelValue ?? ''"
        @input="updateValue"
      >
        <option
          v-for="option in options"
          :key="String(option.value)"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </component>
    </div>

    <p v-if="error" :id="errorId" class="text-sm leading-6 text-red-500">{{ error }}</p>
    <p
      v-else-if="description"
      :id="descriptionId"
      class="text-sm leading-6 text-slate-500 dark:text-slate-400"
    >
      {{ description }}
    </p>
    <p v-if="hint" class="text-sm leading-6 text-sky-500 dark:text-sky-400">{{ hint }}</p>
  </div>
</template>
