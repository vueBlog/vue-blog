import Vue from 'vue'
import '@/plugins/axios'

export const apigetAside = (paramsData) => {
  return Vue.axios.get('/aside', {
    params: {
      ...paramsData
    }
  })
}

export const apigetAsideAuthor = (paramsData) => {
  return Vue.axios.get('/aside/author', {
    params: {
      ...paramsData
    }
  })
}
