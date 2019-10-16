import Vue from "vue";
import Vuex from "vuex";
import Trivia from "./modules/trivia";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    trivia: Trivia
  }
});
