import Vue from 'vue'
import '@/plugins/axios'

export const apiArticleList = (paramsData) => {
  return Vue.axios.get('/api/articleList', {
    params: {
      ...paramsData
    }
  })
}
