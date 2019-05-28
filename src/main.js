import Vue from "vue";
import App from "./App";
import { store } from "./store";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
/**
 * eslint-disable no-new
 */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');