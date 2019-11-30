<template>
  <el-container class="detail">
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
      <detail-skeleton v-if="!info.articleTitle"></detail-skeleton>
      <div class="detail-header" v-else>
        <div class="title-box clearfix">
          <el-tag class="fl">{{ articleType }}</el-tag>
          <h2 class="title ellipsis">{{ info.articleTitle }}</h2>
        </div>
        <div class="detail-info clearfix">
          <div class="info-item">{{ $moment(info.articleUpdateTime).format('YYYY-MM-DD HH:mm:ss') || $moment(info.articleCreateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <router-link to="/about" class="info-item item-author">{{  }}</router-link>
          <div class="info-item">views: {{ info.articleView }}</div>
          <el-button v-if="editAuthority" class="fr" icon="el-icon-edit" size="small" @click="toEditor">编辑</el-button>
          <el-button class="fr" size="small">star: {{ info.articleStart }}</el-button>
        </div>
        <prev-and-next v-if="getResult" :prevInfo="prevInfo" :nextInfo="nextInfo"></prev-and-next>
      </div>
      <div class="detail-content">
        <div class="article-content" v-html="info.articleContentHtml"></div>
        <prev-and-next v-if="getResult" :prevInfo="prevInfo" :nextInfo="nextInfo"></prev-and-next>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AsideCardSkeleton from './../components/AsideCardSkeleton.vue'
import DetailSkeleton from './../components/DetailSkeleton.vue'
import AsideCard from './../components/AsideCard.vue'
import prevAndNext from './../components/PrevAndNext.vue'
import 'highlight.js/scss/default.scss'
import 'highlight.js/styles/vs2015.css'
import { apiArticleDetail } from './../service/article'
import asideMixin from './../mixin/asideMixin'

export default {
  name: 'detail',
  mixins: [asideMixin],
  data () {
    return {
      info: {},
      prevInfo: {},
      nextInfo: {},
      getResult: false
    }
  },
  components: {
    AsideCardSkeleton,
    DetailSkeleton,
    AsideCard,
    prevAndNext
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    }),
    ...mapGetters([
      'signStatus'
    ]),
    editAuthority () {
      return this.signStatus && (this.userInfo.id === this.info.articleAuthorId || this.userInfo.admin)
    },
    articleType () {
      let result
      switch (this.info.articleNature) {
        case 0:
          result = '原创'
          break
        case 1:
          result = '转载'
          break
        case 2:
          result = '翻译'
          break
        default:
          result = '原创'
          break
      }
      return result
    }
  },
  created () {
    this.apiArticleDetailMethod()
  },
  methods: {
    async apiArticleDetailMethod () {
      let result = await apiArticleDetail({
        articleId: this.$route.params.id,
        changeView: 1
      })
      if (result.isok) {
        this.info = result.data.info
        this.prevInfo = result.data.prevInfo
        this.nextInfo = result.data.nextInfo
        this.getResult = true
      }
    },
    toEditor () {
      this.$router.push(`/editor/${this.$route.params.id}`)
    }
  },
  watch: {
    '$route.params.id': function (value) {
      this.apiArticleDetailMethod()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../style/views/home.scss';
@import './../style/views/detail.scss';
</style>

<style lang="scss">
.markdownIt-TOC {
  padding: 0;
  margin: 0 0 15px 15px;
  float: right;
  list-style: none;
  &::before {
    content: '目录：';
    font-weight: 700;
    color: currentColor;
    margin-left: 18px;
    line-height: 26px;
  }
  a {
    text-decoration: none;
    color: #666;
    &:hover {
      color: #409EFF;
    }
  }
}
.article-content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  h1, h2, h3, h4, h5, h6 {
    a {
      color: #409EFF;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
