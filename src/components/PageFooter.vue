<template>
  <div class="footer">
    <div class="link-box">
      <span>友情链接：</span>
      <a class="link-item" href="https://github.com/fxss5201" target="_blank">Github</a>
      <a class="link-item" href="https://blog.csdn.net/fxss5201" target="_blank">CSDN</a>
    </div>
    <div class="verbum-sapienti">
      <span>{{ logoText }}：</span>
      <span>{{ logoDescription }}</span>
    </div>
    <div class="website-information">
      <span>Powered by ©2019</span>
      <router-link to="/about" class="author">樊小书生</router-link>
      <span>***备*********号</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pageFooter',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'logoText',
      'logoDescription'
    ])
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/page-footer.scss';
</style>
