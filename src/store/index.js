import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const CancelToken = axios.CancelToken

export default new Vuex.Store({
  state: {
    source: CancelToken.source() // 存放axios的取消令牌
  },
  mutations: {
    setSource (state, obj) {
      // 路由切换是新建取消令牌，并写入store
      state.source = obj
    }
  },
  actions: {
  },
  modules: {
  }
})
