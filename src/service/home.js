import Vue from 'vue'
import './../plugins/axios'

export default {
  GetHouseList (paramsData, baseUrl) {
    return Vue.axios.get('/api/middlePage/house/getList', {
      params: paramsData,
      baseURL: baseUrl,
      showLoading: false
    })
  }
}
