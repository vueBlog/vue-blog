<template>
  <div>
    <el-page-header @back="$router.back()" content="编辑专栏"></el-page-header>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="margin-top: 15px;">
      <el-form-item label="专栏名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="专栏介绍" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $route.params.id ? '更新' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiColumnEditor, apiColumnDetail } from './../service/column'
export default {
  name: 'AdminColumnEditor',
  data () {
    return {
      loading: false,
      ruleForm: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入专栏名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写专栏介绍', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    }),
    title () {
      return this.userInfo.name ? `${this.userInfo.name}-编辑专栏` : '编辑专栏'
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
    if (this.$route.params.id) {
      this.apiColumnDetailMethod()
    }
  },
  methods: {
    async apiColumnDetailMethod () {
      if (this.loading) return false
      this.loading = true
      let result = await apiColumnDetail({
        id: this.$route.params.id
      })
      this.loading = false
      if (result.isok) {
        this.ruleForm.name = result.data.columnTitle
        this.ruleForm.desc = result.data.columnContent
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiColumnEditorMethod()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async apiColumnEditorMethod () {
      if (this.loading) return false
      this.loading = true
      let result = await apiColumnEditor({
        id: this.$route.params.id,
        name: this.ruleForm.name,
        desc: this.ruleForm.desc
      })
      this.loading = false
      if (result.isok) {
        this.$store.dispatch('aside/apigetAsideMethod')
        this.$store.dispatch('aside/apigetAsideAuthorMethod')
        let content = this.$route.params.id ? '专栏更新成功' : '专栏保存成功'
        this.$alert(content, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/admin/column')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-page-header {
  padding-bottom: 10px;
  line-height: 32px;
  border-bottom: 1px solid #EBEEF5;
}
</style>
