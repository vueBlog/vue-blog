import Vue from 'vue'
import '@/plugins/axios'

export const apiAddUser = (paramsData) => {
  return Vue.axios.post('/addUser', paramsData)
}

export const apiSignIn = (paramsData) => {
  return Vue.axios.post('/signIn', paramsData)
}
