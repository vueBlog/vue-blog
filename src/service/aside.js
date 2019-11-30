import Vue from 'vue'
import '@/plugins/axios'

export const apigetAside = (paramsData) => {
  return Vue.axios.get('/api/getAside', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}
