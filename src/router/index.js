import { createRouter, createWebHistory } from 'vue-router'
import CreateForm from '../views/CreateForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
    path: '/',
    name: 'CreateForm',
    component: CreateForm
  },
  ]
})

export default router
