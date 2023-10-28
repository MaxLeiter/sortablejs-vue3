import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

// Pinia is a store library and is not necessary for this component,
// it's just used for the demo
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
