import {
  getUserRole
} from '@/api/login'
import {
  defaultRouterMap,
  asyncRouterMap
} from "@/router/index.js"

function hasPremission(roles, router) {
  if (router.meta && router.meta.role) {
    return roles.some(item => router.meta.role.indexOf(item) >= 0)
  }
}

const state = {
  roles: [],
  buttonPermission: [],
  allRouters: defaultRouterMap,
  addRouters: [],
}

const getters = {
  roles: state => state.roles,
  allRouters: state => state.allRouters,  // 所有的
  addRouters: state => state.addRouters,  // 匹配的
  buttonPermission: state => state.buttonPermission
}

const mutations = {
  SET_ROLES(state, value) {
    state.roles = value
  },

  SET_ROUTER(state, router) {
    state.addRouters = router
    state.allRouters = defaultRouterMap.concat(router)
  },

  SET_BUTTON(state, value) {
    state.buttonPermission = value
  }
}

const actions = {
  getRoles({
    commit
  }, requestData) {
    return new Promise((resolve, reject) => {
      getUserRole()
        .then(res => {
          let role = res.data
          commit('SET_ROLES', role)
          resolve(role)
        })
        .catch(err => {})
    })
  },
  // "sale", "technician", "manager"
  createRouter({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      let role = data.role
      let addRouters = []
      // 超管的状态
      if (role.includes('admin')) {
        addRouters = asyncRouterMap
      } else { // 普通管理员
        addRouters = asyncRouterMap.filter(item => {
          if (hasPremission(role, item)) {
            // 优先判断 
            if (item.children && item.children.length > 0) {
              item.children = item.children.filter(child => {
                if (hasPremission(role, child)) {
                  return child;
                }
              })
              return item;
            }
            return item;
          }
        })
        addRouters.push(asyncRouterMap[asyncRouterMap.length - 1]);
      }

      commit('SET_ROUTER', addRouters);
      resolve()
    })
  }
}

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
}
