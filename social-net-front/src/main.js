import "./assets/main.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import Carousel from "primevue/carousel";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
  ripple: true //ripple effect
});
app.directive("ripple", Ripple);
app.mount("#app");
