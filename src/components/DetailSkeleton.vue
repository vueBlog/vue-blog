<template>
  <div class="skeleton-box">
    <div class="skeleton-bac-animation"></div>
    <skeleton-rect height="30px" margin="15px 0"></skeleton-rect>
    <div class="skeleton-row" style="margin: 15px 0">
      <skeleton-rect height="30px" width="50%"></skeleton-rect>
      <skeleton-rect height="30px" width="30%"></skeleton-rect>
    </div>
    <div class="skeleton-row" style="margin: 15px 0">
      <skeleton-rect height="25px" width="40%"></skeleton-rect>
      <skeleton-rect height="25px" width="40%"></skeleton-rect>
    </div>
    <div class="line"></div>
    <skeleton-rect height="20px" margin="10px 0"></skeleton-rect>
    <skeleton-rect height="20px" margin="10px 0"></skeleton-rect>
    <skeleton-rect height="20px" margin="10px 0"></skeleton-rect>
    <skeleton-rect height="20px" margin="10px 0" width="50%"></skeleton-rect>
  </div>
</template>

<script>
export default {
  name: 'DetailSkeleton'
}
</script>

<style lang="scss" scoped>
@import '@/style/skeleton.scss';
.line {
  margin: 20px 0 25px;
  height: 0;
  border-bottom: 1px solid #e6e6e6;
}
</style>
