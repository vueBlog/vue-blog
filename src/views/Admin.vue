<template>
  <div class="admin-box">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeIndex"
          :router="true">
          <el-menu-item index="1" :route="`/admin/${userInfo.id}`">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="2" route="/admin/column">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">文章专栏</span>
          </el-menu-item>
          <el-menu-item index="3" route="/admin/views">
            <i class="el-icon-data-line"></i>
            <span slot="title">访问量</span>
          </el-menu-item>
          <el-menu-item index="4" route="/admin/authority" v-if="userInfo.admin">
            <i class="el-icon-set-up"></i>
            <span slot="title">授权</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-container">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'admin',
  data () {
    return {
      menuShow: true,
      isCollapse: true
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    }),
    ...mapGetters([
      'signStatus'
    ]),
    activeIndex () {
      let index
      switch (this.$route.name) {
        case 'adminUser':
          index = '1'
          break
        case 'adminColumn':
          index = '2'
          break
        case 'adminColumnDetail':
          index = '2'
          break
        case 'adminColumnDetailEditor':
          index = '2'
          break
        case 'adminViews':
          index = '3'
          break
        case 'adminAuthority':
          index = '4'
          break
        default:
          index = '1'
          break
      }
      return index
    }
  },
  created () {
    if (!this.signStatus) {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../style/views/admin.scss';
</style>
