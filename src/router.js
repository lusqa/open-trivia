import Vue from "vue";
import Router from "vue-router";
const Home = () => import(/* webChunkName: "Categories" */ "@/views/Home.vue");
const Trivia = () => import(/* webChunkName: "Trivia" */ "@/views/Trivia.vue");
const Report = () => import(/* webChunkName: "Report" */ "@/views/Report.vue");

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
      path: "/report/:category",
      props: true,
      name: "report",
      component: Report
    }
  ]
});
