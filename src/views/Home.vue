<template>
  <el-container class="home">
    <el-aside width="268px">
      <template v-if="!asideList.length">
        <aside-card-skeleton v-for="i in 3" :key="i"></aside-card-skeleton>
      </template>
      <template v-else>
        <aside-card v-for="item in asideList"
          :key="item.type"
          :cardType="item.type"
          :title="item.title"
          :info="item.info"></aside-card>
      </template>
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

import asideMixin from './../mixin/asideMixin'
import listArticleMixin from './../mixin/listArticleMixin'

export default {
  name: 'home',
  mixins: [asideMixin, listArticleMixin],
  data () {
    return {}
  },
  components: {
    AsideCardSkeleton,
    ListArticleSkeleton,
    AsideCard,
    ListArticle
  }
}
</script>

<style scoped lang="scss">
@import './../style/views/home.scss';
</style>
