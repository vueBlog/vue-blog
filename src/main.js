import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import SkeletonRect from './components/skeleton/rect/index.js'
import SkeletonCircle from './components/skeleton/circle/index.js'
import './plugins/element.js'
import moment from 'moment'
import './style/common.scss'
import AsideAd from '@/components/AsideAd.vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

Sentry.init({
  dsn: 'http://0aca0d12d95a44cca26e194b41609609@192.168.1.13:9000/2',
  integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })]
})

// console.log(process.env.VUE_APP_host)
// console.log(process.env.VUE_APP_pathname)
// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'mock') {
  require('./mock/index')
}

const options = {
  color: '#409EFF'
}

Vue.use(VueProgressBar, options)
Vue.use(SkeletonRect)
Vue.use(SkeletonCircle)
Vue.component('aside-ad', AsideAd)

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$cookie = Cookies

router.beforeEach((to, from, next) => {
  Vue.prototype.$message.closeAll()
  const CancelToken = Vue.axios.CancelToken
  from.matched.length && store.state.source.cancel && store.state.source.cancel()
  store.commit('setSource', CancelToken.source())
  Vue.axios.post('/views/add', {
    from: from.fullPath,
    to: to.fullPath,
    ...store.state.userAgent,
    client: 0
  })
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
