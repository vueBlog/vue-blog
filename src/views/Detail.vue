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
      </div>
      <prev-and-next v-if="getResult" :prevInfo="prevInfo" :nextInfo="nextInfo" style="padding: 15px;"></prev-and-next>
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
import Clipboard from 'clipboard'

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
      getResult: false,
      clipboard: ''
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
  mounted () {
    this.$nextTick(() => {
      this.clipboard = new Clipboard('.copy-btn')
      this.clipboard.on('success', (e) => {
        this.$message.success('复制成功')
      })
      this.clipboard.on('error', (e) => {
        this.$message.error('复制成功失败')
      })
    })
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
  },
  destroyed () {
    this.clipboard.destroy()
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
  background: #fff;
  &::before {
    content: '文章目录：';
    font-weight: 700;
    color: currentColor;
    margin-left: -1.5em;
    line-height: 26px;
  }
}
.article-content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
.detail-content {
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    padding-bottom: 20px;
    margin: 0 auto;
    pre {
      background: #1E1E1E !important;
    }
    table {
      width: auto !important;
      max-width: 100% !important;
    }
  }
}
.el-page-header {
  padding-bottom: 10px;
  line-height: 32px;
  border-bottom: 1px solid #EBEEF5;
}
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,&::-webkit-scrollbar-track {
      background: #1E1E1E;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1E1E1E;
      width: 6px
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, .66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 50px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 2px;
    right: 4px;
    z-index: 10;
    color: #333;
    cursor: pointer;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
  }
}
</style>
