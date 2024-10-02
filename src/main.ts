import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from './globals'


const router = createRouter({
  history : createWebHistory(),
  routes:ROUTES,
})

createApp(App).use(router).mount('#app')
