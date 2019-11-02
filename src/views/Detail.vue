<template>
  <el-container class="detail">
    <el-aside width="268px">
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
      <div class="detail-header">
        <div class="title-box clearfix">
          <el-tag class="fl">原创</el-tag>
          <h2 class="title ellipsis">Express4 环境变量配置</h2>
        </div>
        <div class="detail-info clearfix">
          <div class="info-item">2019-10-17 07:52:26</div>
          <router-link to="/about" class="info-item item-author">樊小书生</router-link>
          <div class="info-item">views: 9</div>
          <el-button class="fr" icon="el-icon-edit" size="small">编辑</el-button>
          <el-button class="fr" size="small">star: 9</el-button>
        </div>
        <prev-and-next></prev-and-next>
      </div>
      <div class="detail-content">
        <div class="article-content" v-html="markdownHtml"></div>
        <prev-and-next></prev-and-next>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AsideCard from './../components/AsideCard.vue'
import prevAndNext from './../components/PrevAndNext.vue'
import 'highlight.js/scss/default.scss'
import 'highlight.js/styles/vs2015.css'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import MarkdownIt from 'markdown-it'
hljs.registerLanguage('javascript', javascript)
let md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

export default {
  name: 'detail',
  data () {
    return {
      content: `在进项项目开发中经常会遇到不同环境切换的问题，比如说开发环境和正式环境对应不同服务器的 mysql ，总不能每次切换不同环境的时候修改代码，这样既容易出错，也不利于代码维护，所以这个时候就需要用到环境变量来进行配置了。

## 开发环境
在开发环境中，我们一般链接的是本地服务器的 mysql ，这个时候我们可以通过以下设置来进行变量控制`
    }
  },
  components: {
    AsideCard,
    prevAndNext
  },
  computed: {
    markdownHtml () {
      return this.content && md.render(this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../style/views/home.scss';
@import './../style/views/detail.scss';
</style>
