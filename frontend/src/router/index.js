import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CurrencyConverter from '../views/CurrencyConverter.vue'
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
      path: '/currency-converter',
      name: 'currency-converter',
      meta: { title: 'Currency Converter' },
      component: CurrencyConverter
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
