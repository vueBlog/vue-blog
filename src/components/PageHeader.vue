<template>
  <div class="header clearfix">
    <div class="logo-box fl">
      <img class="logo" src="./../assets/logo.jpg" alt="logo">
      <div class="logo-text">{{ logoText }}</div>
    </div>
    <div class="fr clearfix">
      <el-autocomplete
        class="search-box fl"
        v-model="searchValue"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        clearable
        size="medium"
        prefix-icon="el-icon-search"
        @select="searchHandleSelect"
      ></el-autocomplete>
      <el-menu
        class="header-nav fl"
        :default-active="activeIndex"
        mode="horizontal"
        :router="true"
        @select="menuHandleSelect">
        <el-menu-item
          v-for="item in menuObj"
          :key="item.index"
          :index="item.index"
          :route="item.route">{{ item.title }}</el-menu-item>
        <template v-if="!signStatus">
          <el-menu-item
            index="4"
            route="/signIn">登录</el-menu-item>
        </template>
        <template v-else>
          <el-menu-item
            index="5"
            route="/editor">写新文章</el-menu-item>
          <el-submenu
            index="6">
            <template slot="title">
              <div class="user-box clearfix">
                <img class="user-box_header-img fl" src="./../assets/header.jpg" alt="用户头像">
                <div class="user-box_name ellipsis">{{ userInfo.name }}</div>
              </div>
            </template>
            <el-menu-item index="6-1" :route="`/admin/${userInfo.id}`">个人中心</el-menu-item>
            <el-menu-item index="6-2" route="/views">访问量</el-menu-item>
            <el-menu-item index="6-3" route="/authority" v-if="userInfo.admin">授权</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  data () {
    return {
      menuObj: [
        {
          index: '1',
          route: '/',
          title: '首页'
        },
        {
          index: '2',
          route: '/list',
          title: '归档'
        },
        {
          index: '3',
          route: '/about',
          title: '关于'
        }
      ],
      searchValue: '',
      timeout: null,
      restaurants: [
        { value: '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', 'address': '天山西路438号' },
        { value: '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { value: '贡茶', 'address': '上海市长宁区金钟路633号' }
      ]
    }
  },
  computed: {
    ...mapState({
      logoText: 'logoText',
      userInfo: 'userInfo'
    }),
    ...mapGetters([
      'signStatus'
    ]),
    activeIndex () {
      let res
      for (let i = 0, len = this.menuObj.length; i < len; i++) {
        if (this.menuObj[i].route === this.$route.path) {
          res = this.menuObj[i].index
          break
        }
      }
      if (!res) {
        if (!this.signStatus) {
          if (this.$route.path === '/signIn') res = '4'
        } else {
          if (this.$route.path === '/editor') res = '5'
          if (this.$route.path === '/admin') res = '6'
        }
        if (this.$route.path === '/detail') res = ''
      }
      return res
    }
  },
  created () {

  },
  methods: {
    searchHandleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    querySearchAsync (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    menuHandleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/page-header.scss';
</style>
