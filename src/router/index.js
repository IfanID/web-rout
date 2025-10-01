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
    },
    {
      path: '/library',
      name: 'Library',
      component: () => import('../views/library/index.vue')
    },
    {
      path: '/log',
      name: 'Log',
      component: () => import('../views/log/index.vue')
    },
    {
      path: '/settings/notifikasi',
      name: 'NotificationSettings',
      component: () => import('../views/settings/notifikasi/index.vue')
    }
  ],
})

export default router
