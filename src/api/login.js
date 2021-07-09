import service from '@/utils/request.js'
// 获取验证码接口
export function getSms (data) {
  return service.request({
    method: 'post',
    url: '/getSms/',
    data
  })
}
// 获取用户角色接口
export function getUserRole (data = {}) {
  return service.request({
    method: 'post',
    url: '/userRole/',
    data
  })
}
// 登录
export function postLogin (data) {
  return service.request({
    method: 'post',
    url: '/login/',
    data
  })
}
// 注册
export function postRegister (data) {
  return service.request({
    method: 'post',
    url: '/register/',
    data
  })
}