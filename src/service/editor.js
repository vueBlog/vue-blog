import Vue from 'vue'
import '@/plugins/axios'

export const apiAddArticle = (paramsData) => {
  return Vue.axios.post('/api/addArticle', paramsData)
}
