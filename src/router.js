import { createWebHistory, createRouter } from "vue-router";
import ContactList from './views/ContactList.vue'
import StartScreen from './views/StartScreen.vue'

var metaDatas = {
  title: ""
}

const routes = [
  {
    path: "/",
    meta: metaDatas,
    name: "StartScreeen",
    component: StartScreen
  },
  {
    path: "/contacts",
    meta: metaDatas,
    name: "ContactList",
    component: ContactList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;