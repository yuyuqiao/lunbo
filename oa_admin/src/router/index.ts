import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { appRoutes } from './routes'
import { setRouteEmitter } from "../utils/route-listener"
import store from '../store'
// const store = useStore()
NProgress.configure({ showSpinner: false })
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        requireAuth: false
      }
    },
    // 循环展示页面
    ...appRoutes
  ]
})
router.beforeEach((to, from, next) => {
 
  NProgress.start()
  setRouteEmitter(to)
  let token = sessionStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') next()
    else next('/login')
  }
})
router.afterEach((to, from, next) => {
  // 关闭进度条
  NProgress.done()
})
export default router;