import Vue from 'vue'
import '@/plugins/axios'

export const apiAddUserHeader = (paramsData) => {
  return Vue.axios.post('/addUserHeader', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiSelectUser = (paramsData) => {
  return Vue.axios.get('/adminUser/select', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiUpdateUser = (paramsData) => {
  return Vue.axios.post('/adminUser/update', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiAddViews = (paramsData) => {
  return Vue.axios.post('/adminviews/add', {
    ...paramsData
  })
}

export const apiSelectViews = (paramsData) => {
  return Vue.axios.get('/adminviews/select', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiSelectViewsDetail = (paramsData) => {
  return Vue.axios.get('/adminviews/selectDetail', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiSelectAuthority = (paramsData) => {
  return Vue.axios.get('/adminAuthority/select', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiUpdateAuthority = (paramsData) => {
  return Vue.axios.post('/adminAuthority/update', {
    ...paramsData
  })
}
