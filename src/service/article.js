import Vue from 'vue'
import '@/plugins/axios'

export const apiAddArticle = (paramsData) => {
  return Vue.axios.post('/article/add', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiArticleList = (paramsData) => {
  return Vue.axios.get('/articleList', {
    params: {
      ...paramsData
    },
    needLast: true
  })
}

export const apiArticleDetail = (paramsData) => {
  return Vue.axios.get('/article/detail', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiUpdateArticle = (paramsData) => {
  return Vue.axios.post('/article/update', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiDeleteArticle = (paramsData) => {
  return Vue.axios.post('/article/delete', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

export const apiAddStar = (paramsData) => {
  return Vue.axios.post('/addStar', {
    ...paramsData
  },
  {
    showLoading: true
  })
}

// export const apiDeleteImage = (paramsData) => {
//   return Vue.axios.post('/images/delete', {
//     ...paramsData,
//     showLoading: true
//   })
// }
