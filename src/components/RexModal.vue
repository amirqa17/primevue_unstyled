<template>
  <Dialog
    :visible="visible"
    modal
    @hide="handleClose"
    :header="header"
    :style="dialogStyle"
  >

    <template #header>
      <div class="flex justify-between items-center w-full">
        <span>{{ header }}</span>
        <Button
          icon="pi pi-times"
          class="p-button-text p-button-sm"
          aria-label="Close"
          @click="handleClose"
        />
      </div>
    </template>

    <div v-if="!$slots.content">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ contentText }}</span>
    </div>
    <slot name="content"></slot>

    <div v-if="formInputs.length">
      <div v-for="input in formInputs" :key="input.id" class="mb-4">
        <label :for="input.id" class="block text-surface-700 dark:text-surface-100">
          {{ input.label }}
        </label>
        <component
          :is="input.component"
          v-bind="input.props"
          v-model="input.model"
          :id="input.id"
        />
      </div>
    </div>

    <template v-if="!customFooter">
      <div class="flex justify-end gap-2">
        <Button
          label="Cancel"
          class="p-button-custom-red p-button-outlined w-full sm:w-auto"
          @click="handleClose"
        />
        <Button
          label="Submit"
          class="p-button-custom-red w-full sm:w-auto"
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
    default: () => {} 
  },
  submitAction: {
    type: Function,
    default: () => {} 
  }
});

const emit = defineEmits(['update:visible']);

const handleClose = () => {
  emit('update:visible', false);
  if (props.cancelAction) {
    props.cancelAction();
  }
};
</script>

