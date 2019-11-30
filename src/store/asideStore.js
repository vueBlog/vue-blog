
import { apigetAside } from '../service/aside'

export default {
  namespaced: true,
  state: {
    aside: []
  },
  mutations: {
    setAside (state, value) {
      state.aside = value
    }
  },
  actions: {
    async apigetAsideMethod ({ commit }) {
      let result = await apigetAside()
      if (result.isok) {
        commit('setAside', result.data.list)
      }
    }
  }
}
