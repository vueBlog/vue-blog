import Vue from 'vue'
import '@/plugins/axios'

export const apiTokenGetUserInfo = (paramsData) => {
  return Vue.axios.post('/api/tokenGetUserInfo', paramsData)
}
