import "./assets/main.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(VueVideoPlayer);
app.use(PrimeVue, {
  ripple: true //ripple effect
});
app.directive("ripple", Ripple);
app.mount("#app");
