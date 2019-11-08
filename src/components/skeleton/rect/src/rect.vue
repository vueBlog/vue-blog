<template>
  <div class="rect"
    :style="{ margin, flex, width, height, opacity }"></div>
</template>

<script>
export default {
  name: 'skeleton-rect',
  props: {
    margin: String,
    flex: String,
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '26px'
    },
    opacity: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.rect {
  flex: 0 0 auto;
  background-color: #efefef;
  border-radius: 2px;
}
</style>
