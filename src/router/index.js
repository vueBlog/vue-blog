import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

const PageHome = () => import(/* webpackChunkName: "group-home" */ './../views/Home.vue')
const PageList = () => import(/* webpackChunkName: "group-list" */ './../views/List.vue')
const PageAbout = () => import(/* webpackChunkName: "group-about" */ './../views/About.vue')
const PageSignIn = () => import(/* webpackChunkName: "group-signIn" */ './../views/SignIn.vue')
const PageDetail = () => import(/* webpackChunkName: "group-detail" */ './../views/Detail.vue')
const PageEditor = () => import(/* webpackChunkName: "group-editor" */ './../views/Editor.vue')

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PageHome
  },
  {
    path: '/list',
    name: 'list',
    component: PageList
  },
  {
    path: '/about/:id?',
    name: 'about',
    component: PageAbout
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: PageSignIn
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: PageDetail
  },
  {
    path: '/editor/:id?',
    name: 'editor',
    component: PageEditor
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
