<template>
  <el-container class="about">
    <el-aside width="268px">
      <aside-author-skeleton></aside-author-skeleton>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <el-avatar class="author-img" size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <span class="author-name ellipsis">樊小书生樊小书生樊小书生樊小书生樊小书生樊小书生樊小书生</span>
          </template>
          <aside-author></aside-author>
          <aside-card
            :cardType="1"
            title="最新文章"></aside-card>
          <aside-card
            :cardType="2"
            title="博客专栏"></aside-card>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <el-avatar class="author-img" size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <span class="author-name ellipsis">樊小书生2</span>
          </template>
          <aside-author></aside-author>
          <aside-card
            :cardType="1"
            title="最新文章"></aside-card>
          <aside-card
            :cardType="2"
            title="博客专栏"></aside-card>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main class="content">
      <div class="content-header clearfix">
        <el-checkbox v-model="justOriginal">仅看原创</el-checkbox>
        <div class="content-header_select fr">
          <span>文章排序：</span>
          <el-select v-model="headerSelectValue" placeholder="请选择">
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
        <list-article-skeleton></list-article-skeleton>
        <list-article-skeleton></list-article-skeleton>
        <list-article-skeleton></list-article-skeleton>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
      </div>
      <div class="content-footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
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

export default {
  name: 'about',
  data () {
    return {
      activeName: '1',
      justOriginal: false,
      headerSelectValue: '0',
      headerSelect: [
        {
          value: '0',
          label: '默认'
        }, {
          value: '1',
          label: '按访问量'
        }, {
          value: '2',
          label: '按点赞数'
        }
      ]
    }
  },
  components: {
    AsideAuthorSkeleton,
    ListArticleSkeleton,
    AsideCard,
    ListArticle,
    AsideAuthor
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
</style>
