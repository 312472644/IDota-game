import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import NProgress from '@/utils/nprogress';

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
