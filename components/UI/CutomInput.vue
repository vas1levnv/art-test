<script setup lang="ts">

interface Props {
  modelValue: string;
  placeholder: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onInput = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<template>
    <input class="w-full block px-3 py-1 border border-orange-500 rounded-lg" :value="modelValue" :placeholder="placeholder" @input="onInput($event.target.value)" />
</template>