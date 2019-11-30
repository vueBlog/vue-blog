import Vue from 'vue'
import '@/plugins/axios'

export const apiAddArticle = (paramsData) => {
  return Vue.axios.post('/api/addArticle', {
    ...paramsData,
    showLoading: true
  })
}

export const apiArticleList = (paramsData) => {
  return Vue.axios.get('/api/articleList', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiArticleDetail = (paramsData) => {
  return Vue.axios.get('/api/getArticleDetail', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiUpdateArticle = (paramsData) => {
  return Vue.axios.post('/api/updateArticle', {
    ...paramsData,
    showLoading: true
  })
}
