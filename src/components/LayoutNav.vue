<template>
  <div id="nav-wrap">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu
          :index="item.path"
          v-if="!item.hidden"
          :key="index"
        >
          <!-- 一级菜单 -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item-group>
            <el-menu-item
              v-for="(subItem, index) in item.children"
              :index="subItem.path"
              :key="index"
            >
              {{ subItem.meta.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    // 数据
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);

    // 函数
    const handleOpen = (key, keyPath) => {};
    const handleClose = (key, keyPath) => {};

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers,
    };
  },
};
</script>

<style lang="scss">
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: $navMenu;
    min-height: 400px;
    
  }
}
</style>