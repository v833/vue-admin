import service from '@/utils/request.js'
// 列表
export function getCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/getCategory/',
    data
  })
}
// 新增

// 编辑
export function editCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}
// 删除
export function deleteCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}
// 分类添加
export function addFirstCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}
