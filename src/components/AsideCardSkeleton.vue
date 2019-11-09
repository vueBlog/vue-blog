<template>
  <el-card class="box-card"
    shadow="never">
    <div slot="header">
      <div class="skeleton-box">
        <div class="skeleton-bac-animation"></div>
        <skeleton-rect height="19px"></skeleton-rect>
      </div>
    </div>
    <div class="skeleton-box">
      <div class="skeleton-bac-animation"></div>
      <div class="skeleton-row" v-for="o in 5" :key="o">
        <skeleton-rect margin="4px 5px 4px 0" flex="3" height="18px"></skeleton-rect>
        <skeleton-rect margin="4px 0 4px 5px" flex="1" height="18px"></skeleton-rect>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AsideCardSkeleton'
}
</script>

<style scoped lang="scss">
@import '@/style/skeleton.scss';
</style>
