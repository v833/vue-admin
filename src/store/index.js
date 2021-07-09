import Vue from 'vue'
import Vuex from 'vuex'
// import cookie from 'cookie_js'
import { postLogin } from '@/api/login.js'
import { setToken, setUsername, getUsername, removeToken, removeUsername } from '../utils/app'
import { getCategory } from '../api/news'
import permission from './permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token: '',
    username: getUsername() || '',

  },
  getters: {
    
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
      // html5 本地存储
      window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value) {
      state.token = value
    },
    SET_USERNAME(state, value) {
      state.username = value
    }
  },
  actions: {
    login(content, data) {
      return new Promise((resolve, reject) => {
        // 接口
        postLogin(data).then((response) =>{
          let data = response.data
          content.commit('SET_TOKEN', data.token)
          content.commit('SET_USERNAME', data.username)
          setToken(data.token)
          setUsername(data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    exit(content) {
      return new Promise((resolve) => {
        removeToken();
        removeUsername();
        content.commit('SET_TOKEN', '')
        content.commit('SET_USERNAME', '')
        resolve()
      })
    },
    VuexGetInfoCategory(content, data) {
      return new Promise((resolve, reject) => {
        getCategory()
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }

  },
  modules: {
    permission
  }
})
