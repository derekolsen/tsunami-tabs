import BootstrapVue3 from 'bootstrap-vue-3'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from '@/views/Home.vue'
import Explore from './components/Explore.vue'
import Tab from './components/Tab.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tab/:id', component: Tab },
    { path: '/login', component: Login },
    { path: '/explore', component: Explore },
    { path: '/signup', component: Signup }
  ]
})

createApp(App)
  .use(router)
  .mount('#app')