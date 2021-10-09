import vuetify from "./plugins/vuetify"
import App from './App.vue'

new Vue({
    vuetify,
    router,
    render: h => h(App)
  }).$mount("#app")