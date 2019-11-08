<template>
  <div class="circle"
    :style="{ margin, flex, 'width': diameter, 'height': diameter, opacity }"></div>
</template>

<script>
export default {
  name: 'skeleton-circle',
  props: {
    margin: String,
    flex: String,
    diameter: String, // 直径,
    opacity: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/skeleton.scss';
.circle {
  flex: 0 0 auto;
  background-color: #efefef;
  border-radius: 50%;
}
</style>
