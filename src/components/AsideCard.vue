<template>
  <el-card class="box-card"
    shadow="never">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <div v-for="item in info" :key="item.id" class="box-card_item">
      <router-link
        class="box-card_item-link clearfix"
        :to="`${getTo}${item.id}`">
          <span class="sub-title fr">{{ item.num }} {{ subTitle }}</span>
          <div class="title ellipsis" :title="item.title">{{ item.title }}</div>
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
    },
    info: Array
  },
  data () {
    return {}
  },
  computed: {
    subTitle () {
      let res
      switch (this.cardType) {
        case 1:
        case 3:
          res = 'views'
          break
        case 2:
        case 4:
          res = '篇'
          break
        default:
          break
      }
      return res
    },
    getTo () {
      let res
      switch (this.cardType) {
        case 1:
        case 3:
          res = '/detail/'
          break
        case 2:
        case 4:
          res = '/list/date='
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
