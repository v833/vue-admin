import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

export const defaultRouterMap = [{
    path: '/',
    redirect: '/console',
    hidden: true,
    meta: {
      name: '主页'
    }
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () => import('../views/Login')
  },
  {
    path: '/console',
    name: 'console',
    meta: {
      name: '控制台',
      icon: 'console'
    },
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'index',
      meta: {
        name: '首页'
      },
      component: () => import('../views/Console/index.vue')
    }],
    component: Layout
  },
]
const router = new VueRouter({
  mode: 'hash',
  routes: defaultRouterMap,
  scrollBehavior: () => ({
    y: 0
  }),
})

export default router

export const asyncRouterMap = [{
    path: '/info',
    name: 'info',
    meta: {
      role: ['sale', 'manager'],
      system: 'infoSystem',
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children: [{
        path: '/infoIndex',
        name: 'infoIndex',
        meta: {
          role: ['sale', 'manager'],
          name: '信息列表'
        },
        component: () => import('../views/Info/index.vue')
      },
      {
        path: '/infoCategory',
        name: 'infoCategory',
        meta: {
          role: ['sale'],
          name: '信息分类'
        },
        component: () => import('../views/Info/category.vue')
      },
      {
        path: '/infoDetailed',
        name: 'InfoDetailed',
        hidden: true,
        meta: {
          role: ['sale'],
          name: '详情'
        },
        component: () => import('../views/Info/infoDetailed.vue')
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      role: ['sale'],
      name: '用户管理',
      icon: 'user'
    },
    children: [{
      path: '/userIndex',
      name: 'userIndex',
      meta: {
        role: ['sale'],
        name: '用户列表'
      },
      component: () => import('../views/User/index.vue')
    }, ],
    component: Layout,
  },
]
