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
        popper-class="autocomplete-popper"
      >
        <template slot-scope="{ item }">
          <div class="option-item-box">
            <div class="name ellipsis">{{ getSearchName(item.type) }}</div>
            <div class="content ellipsis">{{ item.articleTitle }}</div>
          </div>
        </template>
      </el-autocomplete>
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
            <el-menu-item index="6-2" route="/admin/views">访问量</el-menu-item>
            <el-menu-item index="6-3" route="/admin/authority" v-if="userInfo.admin">授权</el-menu-item>
            <el-menu-item index="6-4" route="/signIn">退出</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { apiSearch } from './../service/index'

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
      timeout: null
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
      switch (this.$route.name) {
        case 'home':
          res = '1'
          break
        case 'list':
          res = '2'
          break
        case 'about':
          res = '3'
          break
        case 'signIn':
          res = '4'
          break
        case 'detail':
          res = '5'
          break
        case 'admin':
          res = '6'
          break
        case 'adminUser':
          res = '6-1'
          break
        case 'adminViews':
          res = '6-2'
          break
        case 'adminAuthority':
          res = '6-3'
          break
        default:
          res = '1'
          break
      }
      return res
    }
  },
  created () {},
  methods: {
    searchHandleSelect (key) {
      if ([0, 7].includes(key.type)) {
        this.$router.push(`/detail/${key.articleId}`)
      } else if ([1, 2, 3, 4, 5, 6].includes(key.type)) {
        this.$router.push(`/detail/${key.articleId}#${key[`h${key.type}`]}`)
      }
    },
    getSearchName (type) {
      let res
      switch (type) {
        case 0:
          res = '文章标题'
          break
        case 1:
          res = '一级标题'
          break
        case 2:
          res = '二级标题'
          break
        case 3:
          res = '三级标题'
          break
        case 4:
          res = '四级标题'
          break
        case 5:
          res = '五级标题'
          break
        case 6:
          res = '六级标题'
          break
        case 7:
          res = '关键词'
          break
        default:
          break
      }
      return res
    },
    async querySearchAsync (queryString, cb) {
      if (!queryString.length) return
      let result = await apiSearch({
        queryString
      })
      if (result.isok) {
        cb(result.data.searchList)
      }
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    menuHandleSelect (item) {
      console.log(item)
      if (item === '6-4') {
        this.$store.commit('signIn/setToken', '')
        this.$cookie.remove('vueBlogToken', { path: '' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/page-header.scss';
</style>

<style lang="scss">
$border-color:#e6e6e6 !default;
.autocomplete-popper {
  width: 600px!important;
  .el-autocomplete-suggestion__wrap {
    padding: 10px;
  }
  li {
    padding: 0 10px;
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    &:nth-child(1) {
      border-top: 1px solid $border-color;
    }
    .option-item-box {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      .name {
        flex: 0 0 15%;
        max-width: 15%;
      }
      .content {
        box-sizing: border-box;
        padding-left: 10px;
        flex: 0 0 85%;
        max-width: 85%;
        border-left: 1px solid $border-color;
      }
    }
  }
}
</style>
