// 路由守卫
import router from './index'
import {
  getToken, removeToken, removeUsername
} from '../utils/app'
import store from '../store'
const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 路由动态添加，分配菜单。每个角色分配不同菜单
    if (to.path === '/login') {
      removeToken()
      removeUsername()
      store.commit('SET_TOKEN', '')
      store.commit('SET_USERNAME', '')
      next()
    } else {
      next()
    }
    return
  }
  whiteRouter.includes(to.path) ? next() : next('/login')
})
