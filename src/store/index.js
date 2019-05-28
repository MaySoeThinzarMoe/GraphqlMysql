import Vue from "vue";
import Vuex from "vuex";
import { champion } from "./modules/champion/index";
Vue.use(Vuex);

/**
 *eslint-disable no-new
 */
export const store = new Vuex.Store({
  modules: {
    champion
  }
});
