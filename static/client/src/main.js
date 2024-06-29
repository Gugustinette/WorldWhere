import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Axios configuration
import axios from "axios";

// Production
axios.defaults.baseURL = "https://worldwhere.fr";
// Development
// axios.defaults.baseURL = "http://localhost:9090";

createApp(App).use(store).use(router).mount("#app");
