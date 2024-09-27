import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HomeView from './components/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SeasonDetails from './views/SeasonDetails.vue'
import { ROUTES } from './globals'


const router = createRouter({
  history : createWebHistory(),
  routes:ROUTES,
})

createApp(App).use(router).mount('#app')
