// 路由守卫
import router from './index'
import {
  getToken,
  removeToken,
  removeUsername
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
      // 获取用户的色
      // 动态分配路由权限
      /**
       * 1、什么时候处理动态路由 beforeEach
       * 2、以什么条件处理
       * roles[]
       */
      if (store.getters['roles'].length === 0) {
        store.dispatch('getRoles')
          .then(res => {
            let role = res.role
            let btnPerm = res.btnPerm
            let button = res.button
            store.commit('SET_BUTTON', button)
            store.commit('SET_ROLES', role)
            store.dispatch('createRouter', res)
            .then(res => {
              let addRouters = store.getters.addRouters
              let allRouters = store.getters.allRouters
              // 路由更新
              router.options.routes = allRouters
              // 添加动态路由
              router.addRoutes(addRouters)
              next( {...to, replace:true} )
            })
          })
      } else {
        
      }
      
      next()
    }
    return
  }
  whiteRouter.includes(to.path) ? next() : next('/login')
})
