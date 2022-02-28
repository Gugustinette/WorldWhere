import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Axios configuration
import axios from "axios";

axios.defaults.baseURL = "https://worldwhere.fr";

createApp(App).use(store).use(router).mount("#app");
