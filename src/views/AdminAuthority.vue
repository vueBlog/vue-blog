<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="authorEmail"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="authorName"
      label="姓名"
      width="250">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <template v-if="scope.row.authority !== 2">
          {{ getType(scope.row.authority) }}
        </template>
        <template v-else>
          <el-button
            size="mini"
            type="primary"
            @click="handleGroup(scope.$index, scope.row)">成员</el-button>
          <el-button
            size="mini"
            @click="handleBrowse(scope.$index, scope.row)">用户</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">拒绝</el-button> -->
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex'
import { apiSelectAuthority, apiUpdateAuthority } from './../service/admin'

export default {
  name: 'AdminAuthority',
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    })
  },
  created () {
    this.apiSelectAuthorityMethod()
  },
  methods: {
    getType (key) {
      let res
      switch (key) {
        case 0:
          res = '管理员'
          break
        case 1:
          res = '成员'
          break
        case 2:
          res = '注册待通过'
          break
        case 3:
          res = '浏览用户'
          break
        default:
          break
      }
      return res
    },
    async apiSelectAuthorityMethod () {
      let result = await apiSelectAuthority({
        id: this.userInfo.id
      })
      if (result.isok) {
        this.tableData = result.data
      }
    },
    async apiUpdateAuthorityMethod (index, row, val) {
      let result = await apiUpdateAuthority({
        authority: val,
        id: row.authorId
      })
      if (result.isok) {
        this.tableData[index].authority = val
      }
    },
    handleGroup (index, row) {
      this.apiUpdateAuthorityMethod(index, row, 1)
    },
    handleBrowse (index, row) {
      this.apiUpdateAuthorityMethod(index, row, 3)
    }
    // handleDelete (index, row) {
    //   console.log(index, row)
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
