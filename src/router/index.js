import { createRouter, createWebHistory } from 'vue-router'

// Import view
import CreateForm from '../views/CreateForm.vue'

const routes = [
  {
    path: '/',
    name: 'CreateForm',
    component: CreateForm
  },
  // Tambahkan rute lain di sini jika perlu
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
