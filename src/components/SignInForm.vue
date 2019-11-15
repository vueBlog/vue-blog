<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="用户名称" prop="name" v-if="register">
      <el-input
        v-model="ruleForm.name"
        placeholder="请输入用户名称"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="ruleForm.email"
        placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
        placeholder="请输入密码（字母数字下划线）"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" v-if="register">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
        placeholder="请再次输入密码（字母数字下划线）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{ register ? '立即创建' : '登录' }}</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import md5 from 'blueimp-md5'
import { apiAddUser, apiSignIn } from '@/service/signIn'

export default {
  name: 'SignInForm',
  props: {
    register: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '密码不得含有特殊字符', trigger: 'change' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '密码不得含有特殊字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.register) {
            this.apiAddUserMethod()
          } else {
            this.apiSignInMethod()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async apiAddUserMethod () {
      let result = await apiAddUser({
        name: this.ruleForm.name,
        email: this.ruleForm.email,
        password: md5(this.ruleForm.pass)
      })
      if (result.isok) {
        let content = result.data.admin ? '注册成功，现在去登录吧...' : '注册成功，等待管理员同意'
        this.$alert(content, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$emit('toSignIn')
          }
        })
      }
    },
    async apiSignInMethod () {
      let result = await apiSignIn({
        email: this.ruleForm.email,
        password: md5(this.ruleForm.pass)
      })
      if (result.isok) {
        this.$cookie.set('vueBlogEmail', this.ruleForm.email, { expires: 7, path: '' })
        this.$router.push({ path: '/' })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
