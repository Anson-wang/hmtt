import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
// import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  { // 搜索结果页
    path: '/search_result/:kw',
    component: () => import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult')
  },
  { // 文章详情页
    path: '/detail',
    component: () => import(/* webpackChunkName: "Detail" */ '@/views/ArticleDetail')
  },
]

const router = new VueRouter({
  routes
})

export default router
