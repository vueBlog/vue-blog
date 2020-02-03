<template>
  <div class="footer">
    <div class="link-box">
      <span>友情链接：</span>
      <a v-for="item in friendLink" :key="item.text" class="link-item" :href="item.link" target="_blank">{{ item.text }}</a>
    </div>
    <div class="verbum-sapienti">
      <span>{{ logoText }}：</span>
      <span>{{ logoDescription }}</span>
    </div>
    <div class="website-information">
      <span>Powered by <a class="link-item" href="https://github.com/fxss5201" target="_blank" style="margin: 0 5px;">fxss5201</a> © 2019-{{ curYear }}</span>
      <router-link to="/about" class="author">{{ author }}</router-link>
      <span>{{ record }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pageFooter',
  data () {
    return {
      friendLink: JSON.parse(process.env.VUE_APP_friendLink),
      author: process.env.VUE_APP_author,
      record: process.env.VUE_APP_record,
      curYear: ''
    }
  },
  computed: {
    ...mapState([
      'logoText',
      'logoDescription'
    ])
  },
  created () {
    this.curYear = new Date().getFullYear()
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/page-footer.scss';
</style>
