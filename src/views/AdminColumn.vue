<template>
  <div>
    <el-page-header @back="$router.back()" content="专栏列表"></el-page-header>
    <div class="row">
      <el-button plain @click="addColumn">添加专栏</el-button>
    </div>
    <el-table
      v-if="tableData.length"
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="columnTitle"
        label="专栏名称">
      </el-table-column>
      <el-table-column
        label="文章数"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.columnNumber }} 篇
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="创建时间"
        width="240">
      </el-table-column>
      <el-table-column
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiColumnList, apiColumnDelete } from './../service/column'
export default {
  name: 'AdminColumn',
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    }),
    title () {
      return this.userInfo.name ? `${this.userInfo.name}-博客专栏` : '博客专栏'
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
    this.apiColumnListMethod()
  },
  methods: {
    addColumn () {
      this.$router.push('/admin/column/edit')
    },
    async apiColumnListMethod () {
      if (this.loading) return false
      this.loading = true
      let result = await apiColumnList({})
      this.loading = false
      if (result.isok) {
        this.tableData = result.data
      }
    },
    handleEdit (index, obj) {
      this.$router.push(`/admin/column/edit/${obj.columnId}`)
    },
    handleDetail (index, obj) {
      this.$router.push(`/admin/column/${obj.columnId}`)
    },
    handleDelete (index, obj) {
      this.$alert('删除后不可找回，请谨慎删除', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.apiColumnDeleteMethod(obj)
        }
      })
    },
    async apiColumnDeleteMethod (obj) {
      if (this.loading) return false
      this.loading = true
      let result = await apiColumnDelete({
        id: obj.columnId
      })
      this.loading = false
      if (result.isok) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.apiColumnListMethod()
      }
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
</style>
