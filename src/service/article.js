import Vue from 'vue'
import '@/plugins/axios'

export const apiAddArticle = (paramsData) => {
  return Vue.axios.post('/addArticle', {
    ...paramsData,
    showLoading: true
  })
}

export const apiArticleList = (paramsData) => {
  return Vue.axios.get('/articleList', {
    params: {
      ...paramsData
    }
  })
}

export const apiArticleDetail = (paramsData) => {
  return Vue.axios.get('/getArticleDetail', {
    params: {
      ...paramsData
    },
    showLoading: true
  })
}

export const apiUpdateArticle = (paramsData) => {
  return Vue.axios.post('/updateArticle', {
    ...paramsData,
    showLoading: true
  })
}

export const apiDeleteArticle = (paramsData) => {
  return Vue.axios.post('/deleteArticle', {
    ...paramsData,
    showLoading: true
  })
}

export const apiAddStar = (paramsData) => {
  return Vue.axios.post('/addStar', {
    ...paramsData,
    showLoading: true
  })
}

// export const apiDeleteImage = (paramsData) => {
//   return Vue.axios.post('/images/delete', {
//     ...paramsData,
//     showLoading: true
//   })
// }
