import { createRouter, createWebHistory } from 'vue-router';
import { RouterName } from './types';

const routes = [
  {
    path: '/',
    name: RouterName.DESKTOP,
    component: () => import('../pages/ManagementAircraftPage.vue'),
  },
  {
    path: '/trips',
    name: RouterName.TRIPS,
    component: () => import('../pages/OtherPage.vue'),
    meta: {
      layout: () => import('../layouts/OtherLayout.vue'),
    },
  },
  {
    path: '/reports',
    name: RouterName.REPORTS,
    component: () => import('../pages/OtherPage.vue'),
    meta: {
      layout: () => import('../layouts/OtherLayout.vue'),
    },
  },
  {
    path: '/my_company',
    name: RouterName.MY_COMPANY,
    component: () => import('../pages/OtherPage.vue'),
    meta: {
      layout: () => import('../layouts/OtherLayout.vue'),
    },
  },
  {
    path: '/finance',
    name: RouterName.FINANCE,
    component: () => import('../pages/OtherPage.vue'),
    meta: {
      layout: () => import('../layouts/OtherLayout.vue'),
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
