import Vue from 'vue'
import { format, parseISO } from 'date-fns'
import { nl } from 'date-fns/locale'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('formatDateTime', (value: string | number | Date) => {
  if (value) {
    const date = typeof value === 'string' ? parseISO(value) : value
    return format(date, 'PPp', { locale: nl })
  } else {
    return ''
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
