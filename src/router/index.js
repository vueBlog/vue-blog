import Vue from 'vue'
import VueRouter from 'vue-router'
const PageHome = () => import(/* webpackChunkName: "group-home" */ './../views/Home.vue')
const PageList = () => import(/* webpackChunkName: "group-list" */ './../views/List.vue')
const PageAbout = () => import(/* webpackChunkName: "group-about" */ './../views/About.vue')
const PageSignIn = () => import(/* webpackChunkName: "group-signIn" */ './../views/SignIn.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PageHome,
    meta: {
      title: `首页 | ${process.env.VUE_APP_title}的博客`,
      keywords: process.env.VUE_APP_keywords,
      description: process.env.VUE_APP_description
    }
  },
  {
    path: '/list',
    name: 'list',
    component: PageList,
    meta: {
      title: `文章列表 | ${process.env.VUE_APP_title}的博客`,
      keywords: `文章列表 | ${process.env.VUE_APP_keywords}的博客`,
      description: `文章列表 | ${process.env.VUE_APP_description}的博客`
    }
  },
  {
    path: '/about',
    name: 'about',
    component: PageAbout,
    meta: {
      title: `作者信息 | ${process.env.VUE_APP_title}的博客`,
      keywords: `作者信息 | ${process.env.VUE_APP_keywords}的博客`,
      description: `作者信息 | ${process.env.VUE_APP_description}的博客`
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: PageSignIn,
    meta: {
      title: `登录/注册 | ${process.env.VUE_APP_title}的博客`,
      keywords: `登录/注册 | ${process.env.VUE_APP_keywords}的博客`,
      description: `登录/注册 | ${process.env.VUE_APP_description}的博客`
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
