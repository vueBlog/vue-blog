import { mapState } from 'vuex'

export default {
  data () {
    return {
      asideLoad: false
    }
  },
  computed: {
    ...mapState({
      asideList: state => state.aside.aside
    })
  },
  created () {
    if (!this.asideList.length) {
      this.$store.dispatch('aside/apigetAsideMethod').then(() => {
        this.asideLoad = true
      })
    }
  }
}
