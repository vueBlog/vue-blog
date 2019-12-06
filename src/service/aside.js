import Vue from 'vue'
import '@/plugins/axios'

export const apigetAside = (paramsData) => {
  return Vue.axios.get('/api/getAside', {
    params: {
      ...paramsData
    }
  })
}

export const apigetAsideAuthor = (paramsData) => {
  return Vue.axios.get('/api/getAsideAuthor', {
    params: {
      ...paramsData
    }
  })
}
