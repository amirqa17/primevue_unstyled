<script setup lang="ts">
import { ref, watch } from "vue";
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import RexInput from './components/RexInput.vue'
import RexModal from './components/RexModal.vue'
import RexTabs from './components/RexTabs.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import Select from 'primevue/select';

const activeTab = ref('buttons');
const selectedRadio = ref(null);
const selectedCheckbox = ref([]);

const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Input Fields (Work in progress)' },
    { id: 'radio', label: 'Radio Buttons' },
    { id: 'checkbox', label: 'Checkboxes' },
    { id: 'modal', label: 'Modals' },
    { id: 'switch', label: 'Switches' },
    { id: 'dropdown', label: 'Dropdowns' }
];

const selectedCity = ref();
const options = ref([
    { name: 'オプション１', code: '1' },
    { name: 'オプション２', code: '2' },
    { name: 'オプション３', code: '3' },
    { name: 'オプション４', code: '4' },
    { name: 'オプション５', code: '5' }
]);

const isRexModalVisible = ref(false);

const rexModalInputs = [
  { id: 'input1', label: 'Input 1', model: '', autocomplete: 'off' },
  { id: 'input2', label: 'Input 2', model: '', autocomplete: 'off' }
];

</script>

<template>
    <div class="w-full">
        <!-- Component Showcase Container -->
        <div class="mx-auto bg-white rounded-xl shadow-lg max-w-full sm:max-w-3xl">
            <!-- Header -->
            <div class="p-6 border-b border-gray-200">
                <h1 class="text-2xl font-bold text-gray-800">PrimeVue Unstyled + Tailwind CSS Custom Library</h1>
            </div>
            <RexTabs v-model="activeTab" :tabs="tabs" />
            <!-- Content  -->
            <div class="p-4 sm:p-12">
                <!-- Buttons Tab -->
                <div v-if="activeTab === 'buttons'" class="space-y-6">
                    <p class="text-sm sm:text-base">40px in height, 20px left and right from the text</p>
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Button Variants</h2>
                    <div class="flex flex-wrap gap-4">
                        <Button class="p-button-custom-red w-full sm:w-auto">Primary Button</Button>
                        <Button class="p-button-custom-red p-button-outlined w-full sm:w-auto">Outlined Button</Button>
                    </div>
                </div>
                <!-- Dropdown Tab -->
                <div v-if="activeTab === 'dropdown'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Dropdowns</h2>
                    <Select v-model="selectedCity" :options="options" optionLabel="name" placeholder="プレースホルダ" class="w-full md:w-56" />
                </div>
                <!-- Inputs Tab -->
                <div v-if="activeTab === 'inputs'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Input Fields</h2>
                    <div class="flex flex-col gap-4 max-w-md">
                        <RexInput v-model="email" label="Rex Custom Input" inputId="email" helpId="email-help"
                            description="Enter your email to receive updates." />
                    </div>
                </div>

                <!-- Radio Buttons Tab -->
                <div v-if="activeTab === 'radio'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Rex Radio Button</h2>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-2">
                            <RadioButton v-model="selectedRadio" name="option" value="option1" />
                            <label class="text-gray-700">Option 1</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <RadioButton v-model="selectedRadio" name="option" value="option2" />
                            <label class="text-gray-700">Option 2</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <RadioButton v-model="selectedRadio" name="option" value="option3" disabled />
                            <label class="text-gray-400">Disabled Option</label>
                        </div>
                    </div>
                </div>

                <!-- Checkboxes Tab -->
                <div v-if="activeTab === 'checkbox'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Checkbox Options</h2>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="selectedCheckbox" value="check1" />
                            <label class="text-gray-700">Checkbox 1</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="selectedCheckbox" value="check2" />
                            <label class="text-gray-700">Checkbox 2</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="selectedCheckbox" value="check3" disabled />
                            <label class="text-gray-400">Disabled Checkbox</label>
                        </div>
                    </div>
                </div>

                <!-- Modals Tab -->
                <div v-if="activeTab === 'modal'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Rex Modal</h2>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col sm:flex-row gap-2">
                                <Button class="p-button-custom-red w-full sm:w-auto" label="Open Reusable Component Modal" @click="isRexModalVisible = true" />
                            </div>
                        </div>
                    </div>
                    <!-- RexModal Component -->
                    <RexModal 
                        :visible="isRexModalVisible" 
                        header="Rex Modal" 
                        contentText="This is a reusable modal." 
                        :formInputs="rexModalInputs" 
                        @update:visible="isRexModalVisible = $event" 
                        :footerButtons="[ 
                            { label: 'Cancel', class: 'p-button-outlined' }, 
                            { label: 'Submit', class: 'p-button' } 
                        ]"
                    />
                </div>
                <!-- Checkboxes Tab -->
                <div v-if="activeTab === 'switch'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Switcher Component</h2>
                    <div class="flex flex-col gap-4">
                        <ToggleSwitch />
                        <ToggleSwitch disabled />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
