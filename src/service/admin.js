import Vue from 'vue'
import '@/plugins/axios'

export const apiAddUserHeader = (paramsData) => {
  return Vue.axios.post('/api/addUserHeader', {
    ...paramsData,
    showLoading: true
  })
}

export const apiSelectUser = (paramsData) => {
  return Vue.axios.get('/api/adminUser/select', {
    params: {
      ...paramsData,
      showLoading: true
    }
  })
}

export const apiUpdateUser = (paramsData) => {
  return Vue.axios.post('/api/adminUser/update', {
    ...paramsData,
    showLoading: true
  })
}

export const apiAddViews = (paramsData) => {
  return Vue.axios.post('/api/adminviews/add', {
    ...paramsData
  })
}

export const apiSelectViews = (paramsData) => {
  return Vue.axios.get('/api/adminviews/select', {
    params: {
      ...paramsData,
      showLoading: true
    }
  })
}
