import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView')
  },
  {
    path: '/register-confirmation',
    name: 'register-confirmation',
    component: () => import(/* webpackChunkName: "register-confirmation" */ '../views/RegisterConfirmationView')
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UserView')
  },
  {
    path: '/pull',
    name: 'pull',
    component: () => import(/* webpackChunkName: "pull" */ '../views/PullView')
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import(/* webpackChunkName: "unauthorized" */ '../views/UnathorizedView')
  },
  {
    path: '/social',
    name: 'social',
    component: () => import(/* webpackChunkName: "social" */ '../views/SocialView')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
