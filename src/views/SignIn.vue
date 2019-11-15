<template>
  <div class="sign-box">
    <el-tabs
      v-model="activeName"
      stretch
      @tab-click="handleClick">
      <el-tab-pane label="登录" name="signIn">
        <sign-in-form class="form-box"></sign-in-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <sign-in-form class="form-box" :register="true"></sign-in-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SignInForm from './../components/SignInForm.vue'

export default {
  name: 'SignIn',
  components: {
    SignInForm
  },
  data () {
    return {
      activeName: 'signIn'
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/views/sign-in.scss';
</style>
