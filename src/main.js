import "./style/global.css"
import App from "./App.vue";
import { createApp } from "vue";
import GlobalButton from "./components/GlobalButton.vue"
import Badge from "./components/Badge.vue";

const app = createApp(App);

app
    .component("GlobalButton",GlobalButton)
    .component("Badge",Badge);

app.mount("#app");