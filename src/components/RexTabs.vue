<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  tabs: { id: string; label: string }[],
  modelValue: string
}>();

const emit = defineEmits(['update:modelValue']);

const changeTab = (tabId: string) => {
  emit('update:modelValue', tabId);
};
</script>

<template>
  <nav class="flex flex-wrap px-6 border-b border-gray-200" aria-label="Tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="changeTab(tab.id)"
      :class="[
        'px-4 py-3 text-sm font-medium border-b-2 -mb-px',
        modelValue === tab.id
          ? 'border-[#d80000] text-[#d80000]'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      ]"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>
