import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

const PageHome = () => import(/* webpackChunkName: "group-home" */ './../views/Home.vue')
const PageList = () => import(/* webpackChunkName: "group-list" */ './../views/List.vue')
const PageAbout = () => import(/* webpackChunkName: "group-about" */ './../views/About.vue')
const PageSignIn = () => import(/* webpackChunkName: "group-signIn" */ './../views/SignIn.vue')
const PageDetail = () => import(/* webpackChunkName: "group-detail" */ './../views/Detail.vue')
const PageEditor = () => import(/* webpackChunkName: "group-editor" */ './../views/Editor.vue')
const PageAdmin = () => import(/* webpackChunkName: "group-admin" */ './../views/Admin.vue')
const PageAdminUser = () => import(/* webpackChunkName: "group-admin" */ './../views/AdminUser.vue')
const PageAdminViews = () => import(/* webpackChunkName: "group-admin" */ './../views/AdminViews.vue')
const PageAdminAuthority = () => import(/* webpackChunkName: "group-admin" */ './../views/AdminAuthority.vue')

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
  },
  {
    path: '/admin',
    name: 'admin',
    component: PageAdmin,
    children: [
      {
        path: 'views',
        name: 'adminViews',
        component: PageAdminViews
      },
      {
        path: 'authority',
        name: 'adminAuthority',
        component: PageAdminAuthority
      },
      {
        path: ':id',
        name: 'adminUser',
        component: PageAdminUser
      }
    ]
  }
]

const router = new VueRouter({
  // 本地开始时注释
  // mode: 'history',
  base: '/vue-blog/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else if (savedPosition) {
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
