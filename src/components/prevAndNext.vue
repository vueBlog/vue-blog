<template>
  <div class="clearfix">
    <router-link to="/detail" class="page-link fl ellipsis">上一篇：<span>aaaaaaaaaaaa</span></router-link>
    <router-link to="/detail" class="page-link fr ellipsis">下一篇：<span>bbbbb</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'PrevAndNext'
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
