import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Axios configuration
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3100";

createApp(App).use(store).use(router).mount("#app");
