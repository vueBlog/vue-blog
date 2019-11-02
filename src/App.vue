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
    }
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
  },
  mounted () {
    this.$Progress.finish()
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
