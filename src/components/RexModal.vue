<template>
    <Dialog 
      v-model:visible="visible" 
      :header="header" 
      :style="{ width: '25rem' }"
      :closable="false"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ contentText }}</span>
      
      <div v-for="(input, index) in formInputs" :key="index" class="flex items-center gap-4 mb-4">
        <label :for="input.id" class="font-semibold w-24">{{ input.label }}</label>
        <InputText 
          v-model="input.model" 
          :id="input.id" 
          class="flex-auto" 
          :autocomplete="input.autocomplete" 
        />
      </div>
  
      <div class="flex justify-end gap-2">
        <Button 
          class="p-button-custom-red p-button-outlined" 
          type="button" 
          label="Cancel" 
          @click="cancelHandler" 
        />
        <Button 
          class="p-button-custom-red" 
          type="button" 
          label="Save" 
          @click="saveHandler" 
        />
      </div>
    </Dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  
  // Props
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    },
    header: {
      type: String,
      default: 'Default Modal'
    },
    contentText: {
      type: String,
      default: 'Update your information.'
    },
    formInputs: {
      type: Array,
      default: () => []
    }
  });
  
  // Emit event to control visibility from parent
  const emit = defineEmits(['update:visible']);
  
  // Local state
  const visible = ref(props.visible);
  
  // Watch for visibility changes
  watch(() => props.visible, (newValue) => {
    visible.value = newValue;
  });
  
  const cancelHandler = () => {
    emit('update:visible', false);
  };
  
  const saveHandler = () => {
    emit('update:visible', false);
    // Handle save logic, e.g., emit form data or make an API call.
  };
  </script>
  
  <style scoped>
  /* Optional styling for the modal */
  </style>
  