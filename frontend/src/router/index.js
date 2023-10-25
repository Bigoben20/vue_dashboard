import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Admins from '../views/Admins.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Dashboard' },
      component: Dashboard
    },
    {
      path: '/admins',
      name: 'admins',
      meta: { title: 'Admins' },
      component: Admins
    }
  ]
})

export default router
