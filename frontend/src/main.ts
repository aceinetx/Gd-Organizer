import { createApp } from "vue";
import App from "./App.vue";
import "./modal.css";
import "./theme.css";
import "./style.css";
import { loadData } from "./user_data";

loadData();

createApp(App).mount("#app");
