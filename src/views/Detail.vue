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
        <el-page-header @back="$router.go(-1)">
          <div slot="content" class="title-box clearfix">
            <el-tag class="fl">{{ articleType }}</el-tag>
            <h2 class="title ellipsis" :title="info.articleTitle">{{ info.articleTitle }}</h2>
          </div>
        </el-page-header>
        <div class="detail-info clearfix">
          <div class="info-item">{{ info.articleUpdateTime ? $moment(info.articleUpdateTime).format('YYYY-MM-DD HH:mm:ss') : $moment(info.articleCreateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <router-link :to="`/about/${authorInfo.authorId}`" class="info-item item-author">{{ authorInfo.authorName }}</router-link>
          <div class="info-item">views: {{ info.articleView }}</div>
          <el-button v-if="editAuthority" class="fr" icon="el-icon-edit" size="small" @click="toEditor">编辑</el-button>
          <el-button class="fr" size="small" @click="addStar">star: {{ info.articleStart }}</el-button>
        </div>
        <prev-and-next v-if="getResult" :prevInfo="prevInfo" :nextInfo="nextInfo"></prev-and-next>
      </div>
      <div class="detail-content">
        <div class="article-content markdown-body" v-html="info.articleContentHtml"></div>
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
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'
import { apiArticleDetail, apiAddStar } from './../service/article'
import asideMixin from './../mixin/asideMixin'

const defaultTitle = '文章详情'
export default {
  name: 'detail',
  mixins: [asideMixin],
  data () {
    return {
      info: {},
      prevInfo: {},
      nextInfo: {},
      authorInfo: {},
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
    },
    title () {
      return this.info.articleTitle ? `${this.info.articleTitle}-${defaultTitle}` : `${defaultTitle}`
    },
    metaKeywords () {
      return `${this.title} | ${process.env.VUE_APP_keywords}`
    },
    metaDescription () {
      return `${this.title} | ${process.env.VUE_APP_description}`
    }
  },
  metaInfo () {
    return {
      title: this.title,
      titleTemplate: `%s | ${process.env.VUE_APP_title}的博客`,
      meta: [
        { keywords: 'keywords', content: this.metaKeywords },
        { keywords: 'description', content: this.metaDescription }
      ]
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
        this.authorInfo = result.data.authorInfo
        this.getResult = true
        this.$nextTick(() => {
          if (this.$route.hash) {
            let hash = decodeURI(this.$route.hash)
            hash = hash.replace(/`/g, '').replace(/\./g, '').replace(/\(\)/g, '').toLowerCase()
            document.querySelector(hash) && document.querySelector(hash).scrollIntoView({ block: 'center', inline: 'center' })
          }
        })
      }
    },
    toEditor () {
      this.$router.push(`/editor/${this.$route.params.id}`)
    },
    async addStar () {
      let result = await apiAddStar({
        articleId: this.$route.params.id * 1
      })
      if (result.isok) {
        this.$message({
          message: 'Add star success',
          type: 'success'
        })
        this.info.articleStart = result.data.articleStart
      }
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
  float: right;
  list-style: none;
  background: #fff;
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
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto 20px;
  pre {
    background: #1E1E1E;
  }
  table {
    width: auto;
    max-width: 100%;
  }
}
.el-page-header {
  padding-bottom: 10px;
  line-height: 32px;
  border-bottom: 1px solid #EBEEF5;
}
pre.hljs {
  padding: 8px 2px;
  border-radius: 5px;
  position: relative;
  ol {
    list-style: decimal;
    margin: 0;
    margin-left: 40px;
    padding: 0;
    li {
      list-style: decimal-leading-zero;
      position: relative;
      padding-left: 10px;
      .line-num {
        position: absolute;
        left: -40px;
        top: 0;
        width: 40px;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, .66);
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 12px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
}
</style>
