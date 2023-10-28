import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Admins from '../views/Admins.vue'
import Orders from '../views/Orders.vue'

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
    },
    {
      path: '/orders',
      name: 'orders',
      meta: { title: 'Orders' },
      component: Orders
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Sayfa değiştiğinde başlığı güncelle
  document.title = to.meta.title || 'Vue Dashboard';
  next();
});

export default router
