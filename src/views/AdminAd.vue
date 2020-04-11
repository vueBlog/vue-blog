<template>
  <div>
    <el-page-header @back="$router.back()" content="广告列表"></el-page-header>
    <div class="row">
      <el-button plain @click="addAd">添加广告</el-button>
      <el-button plain @click="changeSort">更新排序</el-button>
    </div>
    <div class="row">提示：排序值尽量填不同的数值，以免排列顺序有误。</div>
    <el-table
      v-if="tableData.length"
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="adName"
        label="广告名称">
      </el-table-column>
      <el-table-column
        prop="adUrl"
        label="广告链接"
        width="400">
      </el-table-column>
      <el-table-column
        label="排序"
        width="155">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.adSort"
            :min="1"
            size="mini"
            :step="1"
            placeholder="排序数值"
            step-strictly>
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else class="row">暂无数据</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiAdList, apiDelateAd, apiAdChangeSort } from './../service/ad'
export default {
  name: 'AdminAd',
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
      return this.userInfo.name ? `${this.userInfo.name}-广告位` : '广告位'
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
    this.apiAdListMethod()
  },
  methods: {
    addAd () {
      this.$router.push('/admin/ad/edit')
    },
    async apiAdListMethod () {
      if (this.loading) return false
      this.loading = true
      let result = await apiAdList({})
      this.loading = false
      if (result.isok) {
        this.tableData = result.data
      }
    },
    handleEdit (index, obj) {
      this.$router.push(`/admin/ad/edit/${obj.adId}`)
    },
    handleDelete (index, obj) {
      this.$alert('删除后不可找回，请谨慎删除', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.apiDelateAdMethod(obj)
        }
      })
    },
    async apiDelateAdMethod (obj) {
      const result = await apiDelateAd({
        id: obj.adId
      })
      if (result.isok) {
        this.$message({
          message: '删除成功',
          type: 'success',
          offset: 80
        })
        this.apiAdListMethod()
      }
    },
    async changeSort () {
      let result = await apiAdChangeSort({
        list: this.tableData
      })
      if (result.isok) {
        this.apiAdListMethod()
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
