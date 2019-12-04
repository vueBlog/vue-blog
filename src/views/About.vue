<template>
  <el-container class="about">
    <el-aside width="268px">
      <aside-author-skeleton v-if="!asideAuthor.length"></aside-author-skeleton>
      <el-collapse v-else :value="activeName" accordion @change="collapseChange">
        <el-collapse-item v-for="(author, index) in asideAuthor" :key="index" :name="author.authorId">
          <template slot="title">
            <el-avatar class="author-img" size="small" :src="author.authorHeadimg || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            <span class="author-name ellipsis">{{ author.authorName }}</span>
          </template>
          <aside-author :info="author"></aside-author>
          <aside-card
            :cardType="author.asideArticle.type"
            :title="author.asideArticle.title"
            :info="author.asideArticle.info"></aside-card>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main class="content">
      <div class="author-info" v-if="currentAuthor.authorIntroduce">
        <span>作者简介：</span>{{ currentAuthor.authorIntroduce }}
      </div>
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
          <list-article v-for="item in articleList" :key="item.articleId" :info="item" @deleteArticle="deleteArticle(item)"></list-article>
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
import AsideAuthorSkeleton from './../components/AsideAuthorSkeleton.vue'
import ListArticleSkeleton from './../components/ListArticleSkeleton.vue'
import AsideAuthor from './../components/AsideAuthor.vue'
import AsideCard from './../components/AsideCard.vue'
import ListArticle from './../components/ListArticle.vue'

import listArticleMixin from './../mixin/listArticleMixin'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'about',
  mixins: [listArticleMixin],
  data () {
    return {}
  },
  computed: {
    ...mapState({
      asideAuthor: state => state.aside.asideAuthor
    }),
    ...mapGetters({
      firstAuthor: 'aside/getFirstAuthor'
    }),
    activeName () {
      return this.$route.query.author * 1 || this.firstAuthor
    },
    currentAuthor () {
      return this.asideAuthor.filter(item => item.authorId === this.activeName)[0]
    }
  },
  components: {
    AsideAuthorSkeleton,
    ListArticleSkeleton,
    AsideCard,
    ListArticle,
    AsideAuthor
  },
  created () {
    if (!this.asideAuthor.length) {
      this.$store.dispatch('aside/apigetAsideAuthorMethod')
    }
  },
  methods: {
    collapseChange (value) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          author: value
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/views/home.scss';
.author-img {
  min-width: 28px;
}
.author-name {
  margin-left: 10px;
}
.author-info {
  padding: 0 15px;
  font-size: 14px;
  color: $theme-color;
  span {
    color: $theme-light-color;
  }
}
</style>
