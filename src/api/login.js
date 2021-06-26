import service from '@/utils/request.js'
// 获取验证码接口
export function getSms (data) {
  service.request({
    method: 'post',
    url: '/getSms/',
    data
  })
}
// 获取用户角色接口

// 登录

// 注册