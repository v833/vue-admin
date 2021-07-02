import axios from 'axios'
import { Message } from 'element-ui'
import cookie from 'cookie_js'

// 创建axios, 赋给变量
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api'
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求头 后台需要前端传相关的参数
  config.headers["Tokey"] = cookie.get('admin_token')
  config.headers["UserName"] = cookie.get('username');

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 在对响应数据做些什么
  let data = response.data
  if (data.resCode !== 0) {
    Message.error(data.message)
    return Promise.reject(data)
  }
  return data
}, function (error) {
  // 对响应错误做些什么
  return Promise.reject(error)
})


export default service