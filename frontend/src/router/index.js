import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Exchange from '../views/Exchange.vue'
import News from '../views/News.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: Home
    },
    {
      path: '/exchange',
      name: 'exchange',
      meta: { title: 'Exchange' },
      component: Exchange
    },
    {
      path: '/news',
      name: 'news',
      meta: { title: 'News' },
      component: News
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Sayfa değiştiğinde başlığı güncelle
  document.title = to.meta.title || 'Api App';
  next();
});

export default router
