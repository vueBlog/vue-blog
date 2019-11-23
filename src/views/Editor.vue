<template>
  <el-form
    :model="articleInfo"
    :rules="rules"
    ref="articleInfo"
    label-width="100px">
    <el-form-item label="文章标题" prop="name">
      <el-input v-model="articleInfo.name" placeholder="请填入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="文章性质" prop="nature">
      <el-select v-model="articleInfo.nature" placeholder="请选择文章性质">
        <el-option label="原创" value="0"></el-option>
        <el-option label="转载" value="1"></el-option>
        <el-option label="翻译" value="2"></el-option>
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
        :toolbars="toolbars">
      </mavon-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('articleInfo')">{{ $route.params.id ? '更新' : '保存' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import './../plugins/mavon-editor'
import toolbars from './../plugins/mavon-editor-toolbars'
import { apiAddArticle } from './../service/editor'

export default {
  name: 'editor',
  data () {
    return {
      toolbars: toolbars,
      articleInfo: {
        name: '',
        nature: '',
        keyWords: [],
        desc: ''
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
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            // 更新数据
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
