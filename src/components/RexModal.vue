
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
  footerButtons: {
    type: Array,
    default: () => [
      { label: 'Cancel', class: 'p-button-custom-red p-button-outlined', type: 'button', action: null },
      { label: 'Save', class: 'p-button-custom-red', type: 'button', action: null }
    ]
  
  dialogStyle: {
    type: Object,
    default: () => ({ width: '25rem' })
  },
  customFooter: Boolean
});

const emit = defineEmits(['update:visible']);

const handleClose = () => {
  emit('update:visible', false);
};
</script>

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

    <!-- Footer (Buttons or Custom Slot) -->
    <template v-if="!customFooter">
      <div class="flex justify-end gap-2">
        <Button
          v-for="button in footerButtons"
          :key="button.label"
          :class="button.class"
          :type="button.type"
          :label="button.label"
          @click="button.action ? button.action() : handleClose"
        />
      </div>
    </template>
    <slot v-else name="footer"></slot>
  </Dialog>
</template>


<style scoped>
</style>
