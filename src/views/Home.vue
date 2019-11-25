<template>
  <el-container class="home">
    <el-aside width="268px">
      <aside-card-skeleton></aside-card-skeleton>
      <aside-card
        :cardType="1"
        title="最新文章"></aside-card>
      <aside-card
        :cardType="2"
        title="博客专栏"></aside-card>
      <aside-card
        :cardType="3"
        title="热门文章"></aside-card>
      <aside-card
        :cardType="4"
        title="博客归档"></aside-card>
    </el-aside>
    <el-main class="content">
      <div class="content-header clearfix">
        <el-checkbox v-model="justOriginal" @change="toJustOriginal">仅看原创</el-checkbox>
        <div class="content-header_select fr">
          <span>文章排序：</span>
          <el-select v-model="order" @change="orderChange" placeholder="请选择">
            <el-option
              v-for="item in headerSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="content-list">
        <template v-if="!articleList.length">
          <list-article-skeleton></list-article-skeleton>
          <list-article-skeleton></list-article-skeleton>
          <list-article-skeleton></list-article-skeleton>
          <list-article-skeleton></list-article-skeleton>
          <list-article-skeleton></list-article-skeleton>
        </template>
        <template v-else>
          <list-article v-for="item in articleList" :key="item.articleId" :info="item" @deleteArticle="deleteArticle"></list-article>
        </template>
      </div>
      <div class="content-footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="limit"
          :current-page="page"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AsideCardSkeleton from './../components/AsideCardSkeleton.vue'
import ListArticleSkeleton from './../components/ListArticleSkeleton.vue'
import AsideCard from './../components/AsideCard.vue'
import ListArticle from './../components/ListArticle.vue'

import { apiArticleList } from './../service/article'

export default {
  name: 'home',
  data () {
    return {
      justOriginal: false,
      order: 0,
      headerSelect: [
        {
          value: 0,
          label: '默认'
        }, {
          value: 1,
          label: '按访问量'
        }, {
          value: 2,
          label: '按点赞数'
        }
      ],
      articleList: [],
      total: 0,
      limit: 5,
      page: 1
    }
  },
  components: {
    AsideCardSkeleton,
    ListArticleSkeleton,
    AsideCard,
    ListArticle
  },
  created () {
    this.page = this.$route.query.page * 1 || 1
    this.justOriginal = this.$route.query.original ? this.$route.query.original === 'true' : false
    this.order = this.$route.query.order * 1 || 0
    this.apiArticleListMethod()
  },
  methods: {
    async apiArticleListMethod () {
      let result = await apiArticleList({
        limit: this.limit,
        page: this.page,
        justOriginal: this.justOriginal,
        order: this.order
      })
      if (result.isok) {
        this.total = result.data.total
        this.articleList = result.data.list
      }
    },
    deleteArticle () {
      console.log('deleteArticle')
    },
    handleCurrentChange (val) {
      this.$router.push({ path: '/', query: { page: val } })
    },
    toJustOriginal (val) {
      this.$router.push({ path: '/', query: { ...this.$route.query, original: val, page: 1 } })
    },
    orderChange (val) {
      this.$router.push({ path: '/', query: { ...this.$route.query, order: val, page: 1 } })
    }
  },
  watch: {
    '$route.query.page': function (value) {
      this.page = value
      this.apiArticleListMethod()
    },
    '$route.query.original': function (value) {
      this.justOriginal = value
      this.apiArticleListMethod()
    },
    '$route.query.order': function (value) {
      this.order = value
      this.apiArticleListMethod()
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/views/home.scss';
</style>
