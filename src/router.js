import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Report from "./views/Report.vue";
import Trivia from "./views/Trivia.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/trivia/:category",
      props: true,
      name: "trivia",
      component: Trivia
    },
    {
      path: "/report",
      props: true,
      name: "report",
      component: Report
    }
  ]
});
