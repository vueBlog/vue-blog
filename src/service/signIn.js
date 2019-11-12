import Vue from 'vue'
import '@/plugins/axios'

export const apiAddUser = (paramsData) => {
  return Vue.axios.post('/api/addUser', paramsData)
}

export const apiSignIn = (paramsData) => {
  return Vue.axios.post('/api/signIn', paramsData)
}
