import axios from 'axios'

// 创建axios, 赋给变量
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api'
const service = axios.create({
  baseURL: BASEURL,
  timeout: 3000
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 在对响应数据做些什么
  return response
}, function (error) {
  // 对响应错误做些什么
  return Promise.reject(error)
})


export default service