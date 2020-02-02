import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const defaultTitle = document.title

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'tools' },
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: () => import('./views/Agenda.vue'),
      meta: { title: 'concert agenda' },
    },
    {
      path: '/html',
      name: 'html',
      component: () => import('./views/Html.vue'),
      meta: { title: 'html' },
    },
    {
      path: '/qr',
      name: 'qr',
      component: () => import('./views/QR.vue'),
      meta: { title: 'qr' },
    },
    {
      path: '/countdown',
      name: 'countdown',
      component: () => import('./views/Countdown.vue'),
      meta: { title: 'countdown' },
    },
    {
      path: '/droprates',
      name: 'droprates',
      component: () => import('./views/Droprates.vue'),
      meta: { title: 'drop rate calculator' },
    },
    {
      path: '/bmi',
      name: 'bmi',
      component: () => import('./views/BMI.vue'),
      meta: { title: 'bmi calculator' },
    },
    {
      path: '/lingo',
      name: 'lingo',
      component: () => import('./views/Lingo.vue'),
      meta: { title: 'lingo' },
    },
    {
      path: '/conway',
      name: 'conway',
      component: () => import('./views/Conway.vue'),
      meta: { title: "conway's game of life" },
    },
    {
      path: '/galton',
      name: 'galton',
      component: () => import('./views/Galton.vue'),
      meta: { title: 'galton board' },
    },
    {
      path: '/fourier',
      name: 'fourier',
      component: () => import('./views/Fourier.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${ to.meta.title } | ${ defaultTitle }`
    : defaultTitle
  next()
})

export default router
