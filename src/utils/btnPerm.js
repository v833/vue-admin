import Vue from "vue";
import store from "../store/permission.js";
// 自定义指令
Vue.directive("btnPerm", {
  bind: function (el, bingind, vnode) {
    bingind.def.hasBtnPerm()
    // el 绑定的对象 DOM，原生JS处理
    // 操作DOM
    if (bingind.def.hasBtnPerm(bingind.value)) {
      el.className = el.className + " show-button";
    }
  },
  inserted: function (el) {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {},
  hasBtnPerm: function () {
    const button = store.getters["buttonPermission"]; // 请求到的数据权限
    const roles = store.getters['roles']; // 获取角色 
    // 如果是超级管理员
    console.log(roles);
    if (roles.includes("admin")) {
      return true
    }
    return button.indexOf(permission) != -1;
  }
})
