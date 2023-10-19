import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'), // 指定基础 URL
  routes: [
    {
      path: '/codePage',
      component: () => import('../view/codePage/codePage.vue'),
    },
    {
      path: '/drawPage',
      component: () => import('../components/drawerPage/drawerPage.vue'),
    },
    {
      path: '/sideMenu',
      component: () => import('../components/sideMenu/sideMenu.vue'),
    },
  ],
});

export default router;
