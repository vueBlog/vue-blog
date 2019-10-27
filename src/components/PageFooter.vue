<template>
  <div class="footer">
    <span>{{ logoText }}：</span>
    <span>{{ logoDescription }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pageFooter',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'logoText',
      'logoDescription'
    ])
  }
}
</script>

<style scoped lang="scss">
@import './../style/components/page-footer.scss';
</style>
