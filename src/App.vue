<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <el-container>
      <el-header class="header-box" v-if="layoutShow">
        <page-header></page-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer v-if="layoutShow" height="120px">
        <page-footer></page-footer>
      </el-footer>
    </el-container>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    PageHeader,
    PageFooter
  },
  computed: {
    layoutShow () {
      if (/\/editor\/?\d*/.test(this.$route.path)) {
        return false
      }
      return true
    },
    ...mapState({
      token: state => state.signIn.token
    }),
    ...mapState([
      'userInfo'
    ])
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
    let token = this.$cookie.get('vueBlogToken')
    if (token) {
      this.$store.commit('signIn/setToken', token)
      this.$nextTick(() => {
        this.$store.dispatch('tokenGetUserInfo')
      })
    }
  },
  mounted () {
    this.$Progress.finish()
    const userAgent = this.getBrowserInfo()
    this.$store.commit('setUserAgent', {
      system: userAgent[0],
      browser: userAgent[1],
      browserVersion: userAgent[2],
      ip: window.returnCitySN ? window.returnCitySN.cip : '',
      city: window.returnCitySN ? window.returnCitySN.cname : ''
    })
  },
  methods: {
    getBrowserInfo () {
      const agent = navigator.userAgent.toLowerCase()
      const arr = []
      const system = agent.split(' ')[1].split(' ')[0].split('(')[1]
      arr.push(system)
      const regStrEdge = /edge\/[\d.]+/gi
      const regStrIe = /trident\/[\d.]+/gi
      const regStrFirefox = /firefox\/[\d.]+/gi
      const regStrChrome = /chrome\/[\d.]+/gi
      const regStrSafari = /safari\/[\d.]+/gi
      const regStrOpera = /opr\/[\d.]+/gi
      // IE
      if (agent.indexOf('trident') > 0) {
        arr.push(agent.match(regStrIe)[0].split('/')[0])
        arr.push(agent.match(regStrIe)[0].split('/')[1])
        return arr
      }
      // Edge
      if (agent.indexOf('edge') > 0) {
        arr.push(agent.match(regStrEdge)[0].split('/')[0])
        arr.push(agent.match(regStrEdge)[0].split('/')[1])
        return arr
      }
      // firefox
      if (agent.indexOf('firefox') > 0) {
        arr.push(agent.match(regStrFirefox)[0].split('/')[0])
        arr.push(agent.match(regStrFirefox)[0].split('/')[1])
        return arr
      }
      // Opera
      if (agent.indexOf('opr') > 0) {
        arr.push(agent.match(regStrOpera)[0].split('/')[0])
        arr.push(agent.match(regStrOpera)[0].split('/')[1])
        return arr
      }
      // Safari
      if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
        arr.push(agent.match(regStrSafari)[0].split('/')[0])
        arr.push(agent.match(regStrSafari)[0].split('/')[1])
        return arr
      }
      // Chrome
      if (agent.indexOf('chrome') > 0) {
        arr.push(agent.match(regStrChrome)[0].split('/')[0])
        arr.push(agent.match(regStrChrome)[0].split('/')[1])
        return arr
      }
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  .header-box {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 100;
    padding: 0;
    background: #fff;
  }
}
</style>
