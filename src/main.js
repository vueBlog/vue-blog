import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import moment from 'moment'
import './style/common.scss'

console.log(process.env.VUE_APP_host)
console.log(process.env.VUE_APP_pathname)

const options = {
  color: '#409EFF'
}

Vue.use(VueProgressBar, options)

Vue.config.productionTip = false
Vue.prototype.$moment = moment

router.beforeEach((to, from, next) => {
  Vue.prototype.$message.closeAll()
  document.title = to.meta.title
  document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.keywords)
  document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description)
  const CancelToken = Vue.axios.CancelToken
  store.state.source.cancel && store.state.source.cancel()
  store.commit('setSource', CancelToken.source())
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
