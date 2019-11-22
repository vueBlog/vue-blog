<template>
  <div class="item-box">
    <router-link class="header" :to="articleLink">
      <el-tag class="header-icon">{{ articleType }}</el-tag>
      <h2>{{ info.articleTitle }}</h2>
    </router-link>
    <router-link class="content" :to="articleLink">{{ info.articleSubTitle }}...</router-link>
    <div class="footer clearfix">
      <div class="footer-item">{{ $moment(info.articleCreateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
      <div class="footer-line"></div>
      <div class="footer-item">views <span>{{ info.articleView }}</span></div>
      <div class="footer-line"></div>
      <div class="footer-item">stars <span>{{ info.articleStart }}</span></div>
      <div class="footer-editor fr" v-if="editAuthority">
        <router-link class="footer-item" :to="articleEditorLink">编辑</router-link>
        <div class="footer-line"></div>
        <div class="footer-item" @click="deleteArticle">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ListArticle',
  props: {
    info: Object
  },
  data () {
    return {
    }
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
    articleLink () {
      return `/detail/${this.info.articleId}`
    },
    articleEditorLink () {
      return `/editor/${this.info.articleId}`
    }
  },
  methods: {
    deleteArticle () {
      this.$confirm('是否确定删除文章，删除后不可找回', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteArticle', this.info)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/list-article.scss';
</style>
