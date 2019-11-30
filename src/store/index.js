import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import signIn from './signInStore'
import aside from './asideStore'
import { apiTokenGetUserInfo } from './../service/index'

Vue.use(Vuex)
const CancelToken = axios.CancelToken

export default new Vuex.Store({
  state: {
    source: CancelToken.source(), // 存放axios的取消令牌
    logoText: process.env.VUE_APP_title || '',
    logoDescription: process.env.VUE_APP_description || '',
    userInfo: {
      id: '',
      name: '',
      email: '',
      admin: '',
      authority: 0
    }
  },
  getters: {
    signStatus (state) {
      return !!state.signIn.token
    }
  },
  modules: {
    signIn, aside
  },
  mutations: {
    setSource (state, obj) {
      // 路由切换是新建取消令牌，并写入store
      state.source = obj
    },
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {
    async tokenGetUserInfo ({ state, commit }) {
      let result = await apiTokenGetUserInfo({
        token: state.signIn.token
      })
      commit('setUserInfo', result.data)
    }
  }
})
