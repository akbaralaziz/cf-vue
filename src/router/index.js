import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'create-product',
      component: () => import('../views/CreateProductView.vue'),
    },
    {
      path: '/products/:id',
      name: 'edit-product',
      component: () => import('../views/EditProductView.vue'),
    },
  ],
})

export default router