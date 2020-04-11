import Vue from 'vue'
import '@/plugins/axios'

export const apiAdList = (paramsData) => {
  return Vue.axios.get('/ad/list', {
    params: {
      ...paramsData,
      showLoading: true
    }
  })
}

export const apiAddAd = (paramsData) => {
  return Vue.axios.post('/ad/add', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiAdDetail = (paramsData) => {
  return Vue.axios.get('/ad/detail', {
    params: {
      ...paramsData
    }
  })
}

export const apiDelateAd = (paramsData) => {
  return Vue.axios.post('/ad/delete', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiAdChangeSort = (paramsData) => {
  return Vue.axios.post('/ad/changeSort', {
    ...paramsData
  },
  {
    showLoading: true
  })
}
