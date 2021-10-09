import { createWebHistory, createRouter } from "vue-router";
import ContactList from './views/ContactList.vue'

var metaDatas = {
  title: ""
}

const routes = [
  {
    path: "/",
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