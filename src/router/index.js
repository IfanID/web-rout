import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/index.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/settings/index.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/index.vue')
    }
  ],
})

export default router
