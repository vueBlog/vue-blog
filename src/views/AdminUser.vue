<template>
  <div class="user-box">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px">
      <el-form-item label="用户头像">
        <el-upload
          ref="headerUpload"
          action="/api/vue-blog/addUserHeader"
          accept="image/png, image/jpeg"
          list-type="picture-card"
          :file-list="fileList"
          :data="{ id: $route.params.id }"
          :before-upload="beforeAvatarUpload"
          :on-success="avatarUploadSuccess">
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input
          v-model="userInfo.name"
          placeholder="请输入用户名称"
          @keyup.enter.native="submitForm('userInfo')"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="userInfo.email"
          placeholder="请输入邮箱"
          @keyup.enter.native="submitForm('userInfo')"></el-input>
      </el-form-item>
      <el-form-item label="作者简介" prop="introduce">
        <el-input type="textarea"
          v-model="userInfo.introduce"
          placeholder="请输入作者简介"
          @keyup.enter.native="submitForm('userInfo')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiSelectUser, apiUpdateUser } from './../service/admin'

export default {
  name: 'AdminUser',
  data () {
    return {
      headimg: '',
      userInfo: {
        headimg: '',
        name: '',
        email: '',
        introduce: ''
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请填写作者简介', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title () {
      return this.userInfo.name ? `${this.userInfo.name}-个人中心` : '个人中心'
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
    this.apiSelectUserMethod()
  },
  methods: {
    async apiSelectUserMethod () {
      let result = await apiSelectUser({
        authorId: this.$route.params.id
      })
      if (result.isok) {
        this.userInfo.name = result.data.userInfo.authorName
        this.userInfo.email = result.data.userInfo.authorEmail
        this.userInfo.introduce = result.data.userInfo.authorIntroduce
        if (result.data.userInfo.authorHeadimg) {
          this.userInfo.headimg = `${process.env.VUE_APP_host}/${result.data.userInfo.authorHeadimg}`
          this.fileList = [{ url: this.userInfo.headimg }]
        }
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    avatarUploadSuccess (result) {
      if (result.isok) this.fileList = [{ url: `${process.env.VUE_APP_host}/${result.data.src}` }]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiUpdateUserMethod()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async apiUpdateUserMethod () {
      let result = await apiUpdateUser({
        id: this.$route.params.id,
        name: this.userInfo.name,
        email: this.userInfo.email,
        introduce: this.userInfo.introduce
      })
      if (result.isok) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../style/views/admin.scss';
</style>
