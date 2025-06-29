import { createRouter, createWebHistory } from 'vue-router'
import Kasir from '../views/Kasir.vue'

const routes = [
  {
    path: '/',
    name: 'Kasir',
    component: Kasir
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
