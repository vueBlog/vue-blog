<template>
  <div class="clearfix">
    <router-link :to="`/detail/${prevInfo.articleId}`" class="page-link fl ellipsis">上一篇：<span>{{ prevInfo.articleTitle }}</span></router-link>
    <router-link :to="`/detail/${nextInfo.articleId}`" class="page-link fr ellipsis">下一篇：<span>{{ nextInfo.articleTitle }}</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'PrevAndNext',
  props: {
    prevInfo: Object,
    nextInfo: Object
  }
}
</script>

<style lang="scss" scoped>
@import './../style/common.scss';
.page-link {
  color: $--color-info;
  max-width: 50%;
  text-decoration: none;
  &:hover {
    color: $--color-primary;
  }
}
</style>
