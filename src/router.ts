import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tools/countdown',
      name: 'countdown',
      component: () => import('./views/tools/Countdown.vue'),
    },
    {
      path: '/tools/droprates',
      name: 'droprates',
      component: () => import('./views/tools/Droprates.vue'),
    },
    {
      path: '/tools/lingo',
      name: 'lingo',
      component: () => import('./views/tools/Lingo.vue'),
    },
    {
      path: '/tools/conway',
      name: 'conway',
      component: () => import('./views/tools/Conway.vue'),
    },
  ],
})
