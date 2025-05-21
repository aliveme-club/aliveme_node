import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import OhCard from '@/views/OhCard.vue'
import LifeExchange from '@/views/LifeExchange.vue'
import WomenUnlimited from '@/views/WomenUnlimited.vue'
import { BASE_URL } from '@/env'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ohCard',
    name: 'ohCard',
    component: OhCard
  },
  {
    path: '/lifeExchange',
    name: 'lifeExchange',
    component: LifeExchange
  },
  {
    path: '/womenUnlimited',
    name: 'womenUnlimited',
    component: WomenUnlimited
  },
  {
    path: '/life-exchange',
    redirect: '/lifeExchange'
  },
  {
    path: '/women-unlimited',
    redirect: '/womenUnlimited'
  }
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router 