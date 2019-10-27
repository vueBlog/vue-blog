<template>
  <el-card class="box_card"
    shadow="never">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <div v-for="o in 4" :key="o" class="box_card--item">
      <router-link
        class="box_card--item_link clearfix"
        to="/about">
          <span class="sub-title fr">100 {{ subTitle }}</span>
          <span class="title ellipsis">{{'列表内容 ' + o }}</span>
        </router-link>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AsideCard',
  props: {
    title: String,
    cardType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {}
  },
  computed: {
    subTitle () {
      let res
      switch (this.cardType) {
        case 1:
          res = 'views'
          break
        case 2:
          res = '篇'
          break
        case 3:
          res = 'views'
          break
        case 4:
          res = '篇'
          break
        default:
          break
      }
      return res
    }
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/aside-card.scss';
</style>
