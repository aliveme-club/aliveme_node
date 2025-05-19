import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/oh-card',
    name: 'OHCard',
    component: () => import('../views/OHCard.vue')
  },
  {
    path: '/life-exchange',
    name: 'LifeExchange',
    component: () => import('../views/LifeExchange.vue')
  },
  {
    path: '/women-unlimited',
    name: 'WomenUnlimited',
    component: () => import('../views/WomenUnlimited.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 