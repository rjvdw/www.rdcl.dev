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
      path: '/countdown',
      name: 'countdown',
      component: () => import('./views/Countdown.vue'),
    },
    {
      path: '/droprates',
      name: 'droprates',
      component: () => import('./views/Droprates.vue'),
    },
    {
      path: '/lingo',
      name: 'lingo',
      component: () => import('./views/Lingo.vue'),
    },
    {
      path: '/conway',
      name: 'conway',
      component: () => import('./views/Conway.vue'),
    },
  ],
})
