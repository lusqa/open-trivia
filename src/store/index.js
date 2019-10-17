import Vue from "vue";
import Vuex from "vuex";
import trivia from "./modules/trivia";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    trivia
  }
});
