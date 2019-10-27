import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const CancelToken = axios.CancelToken

export default new Vuex.Store({
  state: {
    source: CancelToken.source(), // 存放axios的取消令牌
    logoText: process.env.VUE_APP_title || '',
    logoDescription: process.env.VUE_APP_description || '',
    userInfo: {
      // name: 'fxss'
    }
  },
  getters: {
    signStatus: state => {
      return !!state.userInfo.name
    }
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
  },
  modules: {
  }
})
