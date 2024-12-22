<template>
 <div class="flex flex-col gap-2">
  <label :for="inputId" class="text-sm font-medium">{{ label }}</label>
  <InputText
    :id="inputId"
    :model-value="modelValue"
    @input="updateValue"
    :aria-describedby="helpId"
    class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <small :id="helpId" class="text-xs text-gray-500">{{ description }}</small>
</div>

  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import InputText from 'primevue/inputtext';
  
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: 'Input Label',
    },
    inputId: {
      type: String,
      default: 'input-text',
    },
    helpId: {
      type: String,
      default: 'help-text',
    },
    description: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:modelValue']);
  
  const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
  </script>
  