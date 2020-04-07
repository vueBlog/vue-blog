<template>
  <div class="column-detail">
    <el-page-header @back="$router.back()" content="专栏详情"></el-page-header>
    <div class="row ellipsis">
      专栏名称： {{ info.columnTitle }}
    </div>
    <div class="row ellipsis">
      专栏介绍： {{ info.columnContent }}
    </div>
    <div class="row ellipsis">
      创建时间： {{ info.time }}
    </div>
    <div class="row ellipsis">
      文章总数： {{ total }}
    </div>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="文章列表" name="first">
        <el-table
          v-loading="loading"
          v-if="tableData.length"
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="articleTitle"
            label="文章名称">
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">移出</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="row">
          <el-pagination
            background
            hide-on-single-page
            layout="prev, pager, next"
            :total="total"
            :page-size="limit"
            :current-page="page"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="添加文章" name="second">
        <el-transfer
          filterable
          v-model="transferValue"
          :data="transferData"
          @change="transferChange"
          :titles="['未添加', '已添加']"
          :button-texts="['移出', '添加']"></el-transfer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiColumnDetail, apiColumnArticleList, apiColumnArticleSet, apiColumnArticleAllList } from './../service/column'
export default {
  name: 'AdminColumnDetail',
  data () {
    return {
      loading: false,
      info: {},
      activeName: 'first',
      tableData: [],
      tableAllData: [],
      transferValue: [],
      transferData: [],
      total: 0,
      limit: 10,
      page: 1
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    }),
    title () {
      return this.userInfo.name ? `${this.userInfo.name}-专栏详情` : '专栏详情'
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
  watch: {
    tableAllData (value) {
      let res = []
      res = this.tableAllData.map(item => {
        return item.articleId
      })
      this.transferValue = res
    }
  },
  created () {
    this.apiColumnDetailMethod()
    this.apiColumnArticleListMethod()
    this.apiColumnArticleAddAllListMethod()
  },
  methods: {
    async apiColumnDetailMethod () {
      let result = await apiColumnDetail({
        id: this.$route.params.id
      })
      if (result.isok) {
        this.info = result.data
      }
    },
    async apiColumnArticleListMethod () {
      if (this.loading) return false
      this.loading = true
      let result = await apiColumnArticleList({
        id: this.$route.params.id,
        limit: this.limit,
        page: this.page
      })
      this.loading = false
      if (result.isok) {
        this.total = result.data.total
        this.tableData = result.data.selectData
      }
    },
    async apiColumnArticleAddAllListMethod () {
      let result = await apiColumnArticleList({
        id: this.$route.params.id,
        limit: 100000,
        page: 1
      })
      if (result.isok) {
        this.tableAllData = result.data.selectData
      }
    },
    tabClick () {
      this.apiColumnArticleListMethod()
      this.apiColumnArticleAllListMethod()
      this.apiColumnArticleAddAllListMethod()
    },
    handleCurrentChange (val) {
      this.page = val
      this.$nextTick(() => {
        this.apiColumnArticleListMethod()
      })
    },
    handleDelete (index, obj) {
      this.apiColumnArticleSetMethod('delete', [obj.articleId])
    },
    async apiColumnArticleSetMethod (type, id) {
      let result = await apiColumnArticleSet({
        type,
        id,
        columnId: this.$route.params.id
      })
      if (result.isok) {
        this.$message({
          message: type === 'delete' ? '移出成功' : '添加成功',
          type: 'success',
          offset: 80
        })
        this.$nextTick(() => {
          this.apiColumnArticleListMethod()
          this.apiColumnArticleAllListMethod()
          this.apiColumnArticleAddAllListMethod()
          this.$store.dispatch('aside/apigetAsideMethod')
          this.$store.dispatch('aside/apigetAsideAuthorMethod')
        })
      }
    },
    async apiColumnArticleAllListMethod (index, obj) {
      let result = await apiColumnArticleAllList({
        id: this.$route.params.id
      })
      if (result.isok) {
        let res = []
        result.data.selectData.map(item => {
          res.push({
            key: item.articleId,
            label: item.articleTitle
          })
        })
        this.transferData = res
      }
    },
    transferChange (value, direction, movedKeys) {
      console.log(movedKeys)
      this.apiColumnArticleSetMethod(direction === 'left' ? 'delete' : 'add', movedKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin: 15px 0;
}
.el-page-header {
  padding-bottom: 10px;
  line-height: 32px;
  border-bottom: 1px solid #EBEEF5;
}
.column-detail {
  /deep/ .el-transfer-panel {
    width: 388px;
  }
}
</style>
