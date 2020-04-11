import Vue from 'vue'
import '@/plugins/axios'

export const apiColumnEditor = (paramsData) => {
  return Vue.axios.post('/column/editor', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiColumnList = (paramsData) => {
  return Vue.axios.get('/column/list', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiColumnDelete = (paramsData) => {
  return Vue.axios.post('/column/delete', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiColumnDetail = (paramsData) => {
  return Vue.axios.get('/column/detail', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiColumnArticleList = (paramsData) => {
  return Vue.axios.get('/column/articleList', {
    params: {
      ...paramsData
    },
    needAll: true
  })
}

export const apiColumnArticleSet = (paramsData) => {
  return Vue.axios.post('/column/articleSet', {
    ...paramsData
  })
}

export const apiColumnArticleAllList = (paramsData) => {
  return Vue.axios.get('/column/articleAllList', {
    params: {
      ...paramsData
    }
  })
}

export const apiColumnChangeSort = (paramsData) => {
  return Vue.axios.post('/column/changeSort', {
    ...paramsData
  },
  {
    showLoading: true
  })
}
