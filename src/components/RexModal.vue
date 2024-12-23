<template>
  <Dialog
    :visible="visible"
    modal
    @hide="handleClose"
    :header="header"
    :style="dialogStyle"
  >
    <!-- Content Slot or Text -->
    <div v-if="!$slots.content">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ contentText }}</span>
    </div>
    <slot name="content"></slot>

    <!-- Render form inputs dynamically -->
    <div v-if="formInputs.length">
      <div v-for="input in formInputs" :key="input.id" class="mb-4">
        <label :for="input.id" class="block text-surface-700 dark:text-surface-100">{{ input.label }}</label>
        <component
          :is="input.component"
          v-bind="input.props"
          v-model="input.model"
          :id="input.id"
        />
      </div>
    </div>

    <!-- Footer (Buttons or Custom Slot) -->
    <template v-if="!customFooter">
      <div class="flex justify-end gap-2">
        <!-- Default Cancel Button with custom action -->
        <Button
          label="Cancel"
          class="p-button-custom-red p-button-outlined"
          type="button"
          @click="cancelAction"
        />
        <!-- Default Submit Button with custom action -->
        <Button
          label="Submit"
          class="p-button-custom-red"
          type="button"
          @click="submitAction"
        />
      </div>
    </template>
    <slot v-else name="footer"></slot>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps({
  visible: Boolean,
  header: {
    type: String,
    default: 'Modal'
  },
  contentText: String,
  formInputs: {
    type: Array,
    default: () => []
  },
  dialogStyle: {
    type: Object,
    default: () => ({ width: '25rem' })
  },
  customFooter: Boolean,
  cancelAction: {
    type: Function,
    default: () => {} // Default no-op function
  },
  submitAction: {
    type: Function,
    default: () => {} // Default no-op function
  }
});

const emit = defineEmits(['update:visible']);

const handleClose = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
</style>
