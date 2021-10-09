import Vue from "vue"
import Router from "vue-router"
import StartScreen from "./views/default/StartScreen.vue"

var metaDatas = {
  title: ""
}

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      meta: metaDatas,
      name: "start",
      component: StartScreen
    }
  ]
})

export default router
