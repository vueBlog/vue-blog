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
