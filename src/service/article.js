import Vue from 'vue'
import '@/plugins/axios'

export const apiArticleList = (paramsData) => {
  return Vue.axios.post('/api/articleList', paramsData)
}
