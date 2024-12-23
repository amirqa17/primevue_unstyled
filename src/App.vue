<script setup lang="ts">
import { ref, watch } from "vue";
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import RexInput from './components/RexInput.vue'
import RexModal from './components/RexModal.vue'
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Select from 'primevue/select';

const activeTab = ref('buttons');
const selectedRadio = ref(null);
const selectedCheckbox = ref([]);
const inputValue = ref('');
const visible = ref(false);
const visibleBlur = ref(false);
const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Input Fields' },
    { id: 'radio', label: 'Radio Buttons' },
    { id: 'checkbox', label: 'Checkboxes' },
    { id: 'modal', label: 'Modals' },
    { id: 'switch', label: 'Switches' },
    { id: 'dropdown', label: 'Dropdowns' }
];

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const isModalVisible = ref(false);
const form = ref({ name: '', email: '' });

const closeModal = () => {
  isModalVisible.value = false;
};

const saveForm = () => {
  console.log('Form saved:', form.value);
  isModalVisible.value = false;
};
const formInputs = ref([
  { id: 'name', label: 'Name', model: form.value.name, component: InputText, props: { placeholder: 'Enter your name' } },
  { id: 'email', label: 'Email', model: form.value.email, component: InputText, props: { type: 'email', placeholder: 'Enter your email' } }
]);
// Local state for modal visibility
const isRexModalVisible = ref(false);

// Example form inputs for the RexModal
const rexModalInputs = [
  { id: 'input1', label: 'Input 1', model: '', autocomplete: 'off' },
  { id: 'input2', label: 'Input 2', model: '', autocomplete: 'off' }
];

// Add a watcher to reset modal visibility when switching tabs
watch(activeTab, (newTab) => {
  if (newTab !== 'modal') {
    isModalVisible.value = false; // Hide modal when switching away from the modal tab
  }
});
</script>

<template>
    <div class="w-full">
        <!-- Component Showcase Container - Changed to max-w-[90%] for a much wider container -->
        <div class="mx-auto bg-white rounded-xl shadow-lg max-w-full sm:max-w-3xl">
            <!-- Header -->
            <div class="p-6 border-b border-gray-200">
                <h1 class="text-2xl font-bold text-gray-800">PrimeVue Unstyled + Tailwind CSS Custom Library</h1>
            </div>

            <!-- Tabs -->
            <div class="border-b border-gray-200">
                <nav class="flex flex-wrap px-6" aria-label="Tabs">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[ 
                        'px-4 py-3 text-sm font-medium border-b-2 -mb-px', 
                        activeTab === tab.id 
                            ? 'border-[#d80000] text-[#d80000]' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' 
                    ]">
                        {{ tab.label }}
                    </button>
                </nav>
            </div>

            <!-- Content Area - Added more horizontal padding -->
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
                    <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
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
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Rex Modal + blur mode</h2>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col sm:flex-row gap-2">
                                <Button class="p-button-custom-red w-full sm:w-auto" label="Show Default Modal" @click="visible = true" />
                                <Button class="p-button-custom-red w-full sm:w-auto" label="Show Blur Modal" @click="visibleBlur = true" />
                                <Button class="p-button-custom-red w-full sm:w-auto" label="Open Reusable Component Modal" @click="isRexModalVisible = true" />
                            </div>
                        </div>
                        <!-- Reusable RexModal component here -->
                        <RexModal
                         :visible="isModalVisible"
                         header="Edit Profile"
                        contentText="Update your profile details below."
                        :formInputs="formInputs"
                        :dialogStyle="{ width: '30rem' }"
                        :cancelAction="cancelFunction"
                        :submitAction="submitFunction"
                        @update:visible="isModalVisible = $event"
  />
                    </div>
                    <!-- Generic Modals -->
                    <Dialog v-model:visible="visible" modal header="Default Modal" :style="{ width: '25rem' }">
                        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                        <div class="flex items-center gap-4 mb-4">
                            <label for="username" class="font-semibold w-24">Username</label>
                            <InputText id="username" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex items-center gap-4 mb-8">
                            <label for="email" class="font-semibold w-24">Email</label>
                            <InputText id="email" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button class="p-button-custom-red p-button-outlined" type="button" label="Cancel" @click="visible = false"></Button>
                            <Button class="p-button-custom-red" type="button" label="Save" @click="visible = false"></Button>
                        </div>
                    </Dialog>
                    <Dialog v-model:visible="visibleBlur" modal header="Blur Modal" :style="{ width: '25rem' }" pt:mask:class="backdrop-blur-sm">
                        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                        <div class="flex items-center gap-4 mb-4">
                            <label for="username" class="font-semibold w-24">Username</label>
                            <InputText id="username" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex items-center gap-4 mb-8">
                            <label for="email" class="font-semibold w-24">Email</label>
                            <InputText id="email" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button class="p-button-custom-red p-button-outlined" type="button" label="Cancel" @click="visibleBlur = false"></Button>
                            <Button class="p-button-custom-red" type="button" label="Save" @click="visibleBlur = false"></Button>
                        </div>
                    </Dialog>

                    <!-- RexModal Component -->
                    <RexModal 
                        :visible="isRexModalVisible" 
                        header="Rex Modal" 
                        contentText="This is a reusable modal." 
                        :formInputs="rexModalInputs" 
                        @update:visible="isRexModalVisible = $event" 
                        :footerButtons="[ 
                            { label: 'Cancel', class: 'p-button-outlined', action: () => isRexModalVisible = false }, 
                            { label: 'Submit', class: 'p-button', action: () => { saveForm(); isRexModalVisible = false; } } 
                        ]"
                    />
                </div>

                <!-- Checkboxes Tab -->
                <div v-if="activeTab === 'switch'" class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-700 mb-4">Switcher Component</h2>
                    <div class="flex flex-col gap-4">
                        <ToggleSwitch v-model="checked" />
                        <ToggleSwitch v-model="checked" disabled />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
