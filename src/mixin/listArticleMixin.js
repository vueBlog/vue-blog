
import { apiArticleList, apiDeleteArticle } from './../service/article'
import { mapState } from 'vuex'

export default {
  data () {
    return {
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
      justOriginal: false,
      order: 0,
      articleList: [],
      total: 0,
      limit: 5,
      page: 1,
      dateTime: '',
      author: '',
      listLoad: false
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    })
  },
  created () {
    this.page = this.$route.query.page * 1 || 1
    this.justOriginal = this.$route.query.original ? this.$route.query.original === 'true' : false
    this.order = this.$route.query.order * 1 || 0
    this.dateTime = this.$route.query.dateTime
    this.author = this.$route.query.author || 'admin'
    this.apiArticleListMethod()
  },
  methods: {
    async apiArticleListMethod () {
      let query = {
        limit: this.limit,
        page: this.page,
        justOriginal: this.justOriginal,
        order: this.order,
        dateTime: this.dateTime
      }
      if (this.$route.name === 'about') {
        query.author = this.author
      }
      let result = await apiArticleList(query)
      if (result.isok) {
        this.total = result.data.total
        this.articleList = result.data.list
        this.listLoad = true
        if (this.total > 0 && !this.articleList.length && this.page > 0) {
          this.page -= 1
          this.apiArticleListMethod()
        }
      }
    },
    async deleteArticle (obj) {
      let result = await apiDeleteArticle({
        articleId: obj.articleId,
        userId: this.userInfo.id
      })
      if (result.isok) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.apiArticleListMethod()
        this.$store.dispatch('aside/apigetAsideMethod')
        this.$store.dispatch('aside/apigetAsideAuthorMethod')
      }
    },
    handleCurrentChange (val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: val
        }
      })
    },
    toJustOriginal (val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          original: val,
          page: 1
        }
      })
    },
    orderChange (val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          order: val,
          page: 1
        }
      })
    }
  },
  watch: {
    '$route.query.page': function (value) {
      this.listLoad = false
      this.page = value
      this.apiArticleListMethod()
    },
    '$route.query.original': function (value) {
      this.listLoad = false
      this.justOriginal = value
      this.apiArticleListMethod()
    },
    '$route.query.order': function (value) {
      this.listLoad = false
      this.order = value
      this.apiArticleListMethod()
    },
    '$route.query.dateTime': function (value) {
      this.listLoad = false
      this.dateTime = value
      this.apiArticleListMethod()
    },
    '$route.query.author': function (value) {
      this.listLoad = false
      this.author = value
      this.apiArticleListMethod()
    }
  }
}
