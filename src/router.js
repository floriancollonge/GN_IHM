import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from './components/StartScreen.vue'

var metaDatas = {
  title: ""
}

const routes = [
  {
    path: "/",
    meta: metaDatas,
    name: "start",
    component: HelloWorld
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;