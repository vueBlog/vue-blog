<template>
  <el-form
    :model="articleInfo"
    :rules="rules"
    ref="articleInfo"
    label-width="100px">
    <el-page-header @back="$router.go(-1)" content="编辑页面" style="padding: 0 0 20px 30px;margin-bottom: 22px;line-height: 32px;border-bottom: 1px solid #EBEEF5;"></el-page-header>
    <el-form-item label="文章标题" prop="name">
      <el-input v-model="articleInfo.name" placeholder="请填入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="文章性质" prop="nature">
      <el-select v-model="articleInfo.nature" placeholder="请选择文章性质">
        <el-option label="原创" :value="0"></el-option>
        <el-option label="转载" :value="1"></el-option>
        <el-option label="翻译" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章关键词">
      <el-tag
        v-for="tag in articleInfo.keyWords"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form-item>
    <el-form-item label="文章内容" prop="desc">
      <mavon-editor
        v-model="articleInfo.desc"
        codeStyle="vs2015"
        ref="md"
        fontSize="14px"
        :boxShadow="false"
        :autofocus="false"
        :toolbars="toolbars"
        @imgAdd="imgAdd"
        @imgDel="imgDel">
      </mavon-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('articleInfo')">{{ $route.params.id ? '更新' : '保存' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import './../plugins/mavon-editor'
import toolbars from './../plugins/mavon-editor-toolbars'
import { apiAddArticle, apiArticleDetail, apiUpdateArticle } from './../service/article'
import '@/plugins/axios'

const defaultTitle = '写文章'
export default {
  name: 'editor',
  data () {
    return {
      toolbars: toolbars,
      token: '',
      articleInfo: {
        name: '',
        nature: '',
        keyWords: [],
        desc: '',
        articleAuthorId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '请选择文章性质', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    ...mapGetters([
      'signStatus'
    ]),
    title () {
      return this.$route.params.id ? this.articleInfo.name ? `编辑文章-${this.articleInfo.name}` : '编辑文章' : `${defaultTitle}`
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
    if (!this.signStatus) {
      this.$router.replace('/')
    }
    if (this.$route.params.id) {
      this.apiArticleDetailMethod()
    }
    this.getToken()
  },
  methods: {
    async apiArticleDetailMethod () {
      let result = await apiArticleDetail({
        articleId: this.$route.params.id
      })
      if (result.isok) {
        if (this.userInfo.id === result.data.info.articleAuthorId || this.userInfo.admin) {
          this.articleInfo = {
            name: result.data.info.articleTitle,
            nature: result.data.info.articleNature,
            keyWords: result.data.info.articleKey.split(','),
            desc: result.data.info.articleContentMarkdown,
            articleAuthorId: result.data.info.articleAuthorId
          }
        } else {
          this.$router.replace('/')
        }
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            // 更新数据
            this.apiUpdateArticleMethod()
          } else {
            // 新建文章
            this.apiAddArticleMethod()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async apiAddArticleMethod () {
      let result = await apiAddArticle({
        authorId: this.userInfo.id,
        title: this.articleInfo.name,
        nature: this.articleInfo.nature,
        keyWords: this.articleInfo.keyWords,
        content: this.articleInfo.desc
      })
      if (result.isok) {
        this.$store.dispatch('aside/apigetAsideMethod')
        this.$store.dispatch('aside/apigetAsideAuthorMethod')
        let content = this.$route.params.id ? '文章更新成功' : '文章保存成功'
        this.$alert(content, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/')
          }
        })
      }
    },
    async apiUpdateArticleMethod () {
      let result = await apiUpdateArticle({
        articleId: this.$route.params.id,
        title: this.articleInfo.name,
        nature: this.articleInfo.nature,
        keyWords: this.articleInfo.keyWords,
        content: this.articleInfo.desc
      })
      if (result.isok) {
        let content = this.$route.params.id ? '文章更新成功' : '文章保存成功'
        this.$alert(content, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/')
          }
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleClose (tag) {
      this.articleInfo.keyWords.splice(this.articleInfo.keyWords.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue && !this.articleInfo.keyWords.includes('baidu')) {
        this.articleInfo.keyWords.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async getToken () {
      const result = await this.axios.get('/images/add', { showLoading: true })
      result.isok && (this.token = result.upToken)
    },
    imgAdd (pos, $file) {
      const keyname = $file.name.replace(/.*(\.[a-zA-Z]*)/, `article${Date.parse(new Date())}${Math.floor(Math.random() * 100)}$1`)
      let formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('token', this.token)
      formdata.append('key', keyname)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.axios.post(process.env.VUE_APP_qiniu_domain, formdata, config).then(res => {
        this.$refs.md.$img2Url(pos, `${process.env.VUE_APP_img_domain}/${res.key}`)
      }).catch(err => {
        console.log(err)
      })
    },
    imgDel (pos) {
      console.log(pos)
    }
  }
}
</script>

<style scoped lang="scss">
.el-tag + .el-tag,
.el-tag + .button-new-tag,
.el-tag + .input-new-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.v-note-wrapper {
  border: 1px solid #DCDFE6;
}
</style>
