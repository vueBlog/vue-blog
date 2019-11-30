
import { apiArticleList } from './../service/article'

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
      page: 1
    }
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
      this.$router.push({
        path: '/',
        query: {
          page: val
        }
      })
    },
    toJustOriginal (val) {
      this.$router.push({
        path: '/',
        query: {
          ...this.$route.query,
          original: val,
          page: 1
        }
      })
    },
    orderChange (val) {
      this.$router.push({
        path: '/',
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
