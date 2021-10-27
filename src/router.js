import Router from "vue-router"
import Vue from 'vue';

import ContactList from './views/ContactList.vue'
import StartScreen from './views/StartScreen.vue'
import DefaultTheme from './views/DefaultTheme.vue'

Vue.use(Router);

var metaDatas = {
  title: ""
}

const routes = [
  {
    path: "/",
    meta: metaDatas,
    name: "StartScreen",
    component: StartScreen
  },
  {
    path: "/home",
    meta: metaDatas,
    name: "default",
    component: DefaultTheme,
    children: [
      {
        path: "/contacts",
        meta: metaDatas,
        name: "ContactList",
        component: ContactList
      }
    ]
  }
  
];
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

export default router;