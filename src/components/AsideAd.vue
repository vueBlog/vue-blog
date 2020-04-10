<template>
  <div class="ad-box">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in adList" :key="index">
        <a :href="item.url" class="item-box">
          <img class="img" :src="item.pc_img" :alt="item.name">
          <div class="title">{{ item.name }}</div>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import adList from '@/assets/js/asideAd.js'
import '@/plugins/swiper.js'

export default {
  name: 'AsideAd',
  data () {
    return {
      adList,
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-box {
  margin-top: 15px;
  .item-box {
    position: relative;
    font-size: 0;
    .img {
      width: 100%;
    }
    .title {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      color: #fff;
      font-size: 14px;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .swiper-pagination {
    box-sizing: border-box;
    padding-right: 5px;
    bottom: 12px;
    text-align: right;
  }
}
</style>
