import { getCategory, getCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from '@/utils/request.js'
export function common() {
  const categoryItem = reactive({
    item: []
  });
  /**
   * 获取分类
   */
  const getInfoCategory = () => {
    getCategory({})
      .then(response => {
        categoryItem.item = response.data.data;
      })
      .catch(error => {
        root.$message.error(error)
      });
  };

   // 获取全部分类
  const getInfoCategoryAll = () => {
    getCategoryAll({})
      .then(response => {
        categoryItem.item = response.data;
      })
      .catch(error => {});
  };

  return {
    getInfoCategory,
    getInfoCategoryAll,
    categoryItem
  };
}

// 获取七牛云token
export function qiniuToKen (data) {
  return service.request({
    method: 'post',
    url: '/uploadImgToken/',
    data
  })
}

export function loadTableData (params) {
  return service.request({
    method: params.method || 'post',
    url: params.url,
    data: params.data || {}
  })
}
// 添加用户
export function addUser (data) {
  return service.request({
    method: 'post',
    url: '/user/add/',
    data,
  })
}
// 添加地区
export function GetCityPicker(data){
  return service.request({
      method: "post",
      url: "/cityPicker/",
      data
  })
}
