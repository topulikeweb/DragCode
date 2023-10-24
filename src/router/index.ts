import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'), // 指定基础 URL
  routes: [
    {
      path: '',
      component: () => import('../components/drawerPage/drawerPage.vue'),
    },
    {
      path: '/codePage',
      component: () => import('../view/codePage/codePage.vue'),
    },
    {
      path: '/drawPage',
      component: () => import('../components/drawerPage/drawerPage.vue'),
    },
  ],
});

export default router;
