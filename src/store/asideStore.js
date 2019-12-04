
import { apigetAside, apigetAsideAuthor } from '../service/aside'

export default {
  namespaced: true,
  state: {
    aside: [],
    asideAuthor: []
  },
  getters: {
    getFirstAuthor (state) {
      return state.asideAuthor.length ? state.asideAuthor[0].authorId : 0
    }
  },
  mutations: {
    setAside (state, value) {
      state.aside = value
    },
    setAsideAuthor (state, value) {
      state.asideAuthor = value
    }
  },
  actions: {
    async apigetAsideMethod ({ commit }) {
      let result = await apigetAside()
      if (result.isok) {
        commit('setAside', result.data.list)
      }
    },
    async apigetAsideAuthorMethod ({
      commit
    }) {
      let result = await apigetAsideAuthor()
      if (result.isok) {
        commit('setAsideAuthor', result.data)
      }
    }
  }
}
