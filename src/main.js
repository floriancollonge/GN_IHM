import { createApp } from 'vue'
import App from './App.vue'
import routerCustom from "./router"

createApp(App)
    .use(routerCustom)
    .mount('#app')
