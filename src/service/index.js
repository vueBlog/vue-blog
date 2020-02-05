import Vue from 'vue'
import '@/plugins/axios'

export const apiTokenGetUserInfo = (paramsData) => {
  return Vue.axios.post('/tokenGetUserInfo', paramsData)
}

export const apiSearch = (paramsData) => {
  return Vue.axios.post('/search', {
    ...paramsData
  },
  {
    needLast: true
  })
}
