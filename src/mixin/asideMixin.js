import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      asideList: state => state.aside.aside
    })
  },
  created () {
    if (!this.asideList.length) {
      this.$store.dispatch('aside/apigetAsideMethod')
    }
  }
}
