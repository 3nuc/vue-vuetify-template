import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ky from "ky";

createApp().mount(
  {
    router,
    store,
    vuetify,
    render: h => h(App)
  },
  "#app"
);

// await ky.get("");
// export {};
