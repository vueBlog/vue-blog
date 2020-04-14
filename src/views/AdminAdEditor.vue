<template>
  <div>
    <el-page-header @back="$router.back()" content="编辑广告"></el-page-header>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="margin-top: 15px;">
      <el-form-item label="广告名称" prop="adName">
        <el-input v-model="ruleForm.adName" placeholder="请输入广告名称"></el-input>
      </el-form-item>
      <el-form-item label="广告链接" prop="adUrl">
        <el-input v-model="ruleForm.adUrl" placeholder="请输入广告链接"></el-input>
      </el-form-item>
      <el-form-item label="广告PC图" prop="adPcImg">
        <el-input v-model="ruleForm.adPcImg" placeholder="请上传广告PC图"></el-input>
        <div class="row">
          <el-upload
            ref="headerUpload"
            accept="image/png, image/jpeg"
            list-type="picture-card"
            :action="action"
            :file-list="fileListPc"
            :data="{ token, key: pcKey }"
            :before-upload="beforeAvatarUploadPc"
            :on-success="avatarUploadSuccessPc">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="广告M图" prop="adMImg">
        <el-input v-model="ruleForm.adMImg" placeholder="请上传广告M图"></el-input>
        <div class="row">
          <el-upload
            ref="headerUpload"
            accept="image/png, image/jpeg"
            list-type="picture-card"
            :action="action"
            :file-list="fileListM"
            :data="{ token, key: mKey }"
            :before-upload="beforeAvatarUploadM"
            :on-success="avatarUploadSuccessM">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $route.params.id ? '更新' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiAddAd, apiAdDetail } from './../service/ad'
export default {
  name: 'AdminAdEditor',
  data () {
    return {
      loading: false,
      action: process.env.VUE_APP_qiniu_domain,
      token: '',
      pcKey: `ad-pc-${Date.parse(new Date())}-${process.env.NODE_ENV}`,
      mKey: `ad-m-${Date.parse(new Date())}-${process.env.NODE_ENV}`,
      fileListPc: [],
      fileListM: [],
      ruleForm: {
        adName: '',
        adUrl: '',
        adPcImg: '',
        adMImg: ''
      },
      rules: {
        adName: [
          { required: true, message: '请输入广告名称', trigger: 'blur' }
        ],
        adUrl: [
          { required: true, type: 'url', message: '请输入广告链接', trigger: 'blur' }
        ],
        adPcImg: [
          { required: true, message: '请上传广告PC图', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo'
    }),
    title () {
      return this.userInfo.name ? `${this.userInfo.name}-编辑广告` : '编辑广告'
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
    this.getToken()
    if (this.$route.params.id) {
      this.apiAdDetailMethod()
    }
  },
  methods: {
    async getToken () {
      const result = await this.axios.get(`/ad/getToken`, { showLoading: true })
      result.isok && (this.token = result.upToken)
    },
    async apiAdDetailMethod () {
      let result = await apiAdDetail({
        id: this.$route.params.id
      })
      if (result.isok) {
        this.ruleForm = result.data
        this.fileListPc = result.data.adPcImg ? [{ url: result.data.adPcImg }] : []
        this.fileListM = result.data.adMImg ? [{ url: result.data.adMImg }] : []
      }
    },
    beforeAvatarUploadPc (file) {
      this.beforeAvatarUpload(file)
    },
    beforeAvatarUploadM (file) {
      this.beforeAvatarUpload(file)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message({
          message: '上传头像图片只能是 JPG/PNG 格式!',
          type: 'error',
          offset: 80
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传头像图片大小不能超过 2MB!',
          type: 'error',
          offset: 80
        })
      }
      return (isJPG || isPNG) && isLt2M
    },
    avatarUploadSuccessPc (result) {
      this.avatarUploadSuccess(result, 'pc')
    },
    avatarUploadSuccessM (result) {
      this.avatarUploadSuccess(result, 'm')
    },
    avatarUploadSuccess (result, key) {
      if (result.key) {
        const url = `${process.env.VUE_APP_img_domain}/${result.key}`
        this[key === 'pc' ? 'fileListPc' : 'fileListM'] = [{ url }]
        this.ruleForm[key === 'pc' ? 'adPcImg' : 'adMImg'] = url
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiAddAdMethod()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async apiAddAdMethod () {
      let result = await apiAddAd({
        id: this.$route.params.id,
        name: this.ruleForm.adName,
        url: this.ruleForm.adUrl,
        pcImg: this.ruleForm.adPcImg,
        mImg: this.ruleForm.adMImg
      })
      if (result.isok) {
        this.$message({
          message: '保存成功',
          type: 'success',
          offset: 80
        })
        this.$router.push('/admin/ad')
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
