import Vue from 'vue'
import '@/plugins/axios'

export const apigetAside = (paramsData) => {
  return Vue.axios.get('/getAside', {
    params: {
      ...paramsData
    }
  })
}

export const apigetAsideAuthor = (paramsData) => {
  return Vue.axios.get('/getAsideAuthor', {
    params: {
      ...paramsData
    }
  })
}
