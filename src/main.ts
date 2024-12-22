import Button from "primevue/button";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./style.css";

const app = createApp(App);
app.component("InputText", InputText);
app.component("Button", Button);
app.use(PrimeVue, { theme: "none", options: { darkModeSelector: ".fake-dark-selector", }, });
app.mount("#app");
