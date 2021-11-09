import Vue from "vue"
import App from './App.vue'
import router from "./router"
import "@fortawesome/fontawesome-free/css/all.css"
import vuetify from "./plugins/vuetify"
import moment from 'moment'

Vue.prototype.$moment = moment;


new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount("#app")