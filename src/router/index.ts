import { createRouter, createWebHistory } from 'vue-router';
import { Store } from '../pinia';

const router = createRouter({
  history: createWebHistory('/'), // 指定基础 URL
  routes: [
    {
      path: '',
      component: () => import('../view/drawPageView/drawPageView.vue'),
    },
    {
      path: '/codePage',
      component: () => import('../view/codePage/codePage.vue'),
    },
    {
      path: '/login',
      component: () => import('../view/login/login.vue'),
    },
    {
      path: '/drawPageView',
      component: () => import('../view/drawPageView/drawPageView.vue'),
    },
    {
      path: '/login',
      component: () => import('../view/login/login.vue'),
    },
    {
      path: '/register',
      component: () => import('../view/register/register.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userIsAuthenticated = Store().token;
  if (to.path === '/' || to.path === '/login' || to.path === '/register') {
    // 如果用户访问首页或登录页，不执行认证检查
    next();
  } else {
    if (!userIsAuthenticated) {
      // 如果用户未认证，重定向到登录页
      next('/login');
    } else {
      // 用户已认证，继续导航
      next();
    }
  }
});

export default router;
