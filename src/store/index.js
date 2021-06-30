import Vue from 'vue'
import Vuex from 'vuex'
// import Cookie from 'cookie_js'
import { postLogin } from '@/api/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  getters: {

  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
      // html5 本地存储
      window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    }
  },
  actions: {
    login(content, data) {
      return new Promise((resolve, reject) => {
        // 接口
        postLogin(data).then((response) =>{
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
