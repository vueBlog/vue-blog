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
import VueI18n from 'vue-i18n'
import language from './language/index.js'

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
Vue.use(VueI18n)
Vue.use(SkeletonRect)
Vue.use(SkeletonCircle)

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$cookie = Cookies

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: language
})

router.beforeEach((to, from, next) => {
  Vue.prototype.$message.closeAll()
  const CancelToken = Vue.axios.CancelToken
  store.state.source.cancel && store.state.source.cancel()
  store.commit('setSource', CancelToken.source())
  Vue.axios.post('/adminviews/add', {
    from: from.fullPath,
    to: to.fullPath,
    ...store.state.userAgent
  })
  next()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
