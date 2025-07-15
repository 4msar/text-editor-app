import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createMenu } from "./utils/menu";

createMenu().then((menu) => {
    menu.setAsAppMenu().then((res) => {
        console.log("menu set success", res);
    });
});

createApp(App).mount("#app");
