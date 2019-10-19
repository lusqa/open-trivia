import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import PortalVue from "portal-vue";
Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
