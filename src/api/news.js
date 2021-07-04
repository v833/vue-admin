import service from '@/utils/request.js'
// 列表
export function getCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/getCategory/',
    data
  })
}
export function getCategoryAll (data) {
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data
  })
}
export function getList (data) {
  return service.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}
// 新增
export function addInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}
// 编辑
export function editCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}
export function editInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
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
export function deleteInfo (data) {
  return service.request({
    method: 'post',
    url: '/news/deleteInfo/',
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
export function addChildrenCategory (data) {
  return service.request({
    method: 'post',
    url: '/news/addChildrenCategory/',
    data
  })
}
