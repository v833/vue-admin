<template>
  <div id="nav-wrap">
    <img src="@/assets/logo.png" />
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :default-active="defalutActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu :index="item.path" v-if="!item.hidden" :key="index">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item-group>
            <template v-for="(subItem, index) in item.children">
              <el-menu-item
                v-if="!subItem.hidden"
                :index="subItem.path"
                :key="index"
              >
                {{ subItem.meta.name }}
              </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from "@vue/composition-api";
import SvgIcon from "./SvgIcon.vue";
export default {
  components: { SvgIcon },
  name: "navMenu",
  setup(props, { root }) {
    // 数据
    const routers = reactive(root.$router.options.routes);
    const isCollapse = computed(() => root.$store.state.isCollapse);
    // 函数
    const defalutActive = computed(() => {
      const route = root.$route;
      const { path } = route;
      return path;
    });
    watch(() => root.$router.options.routes, (val) => {
      routers = val
    })
    return {
      isCollapse,
      routers,
      defalutActive
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
  @include webkit(transition, all 0.3s ease 0s);
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: $navMenu;
    // min-height: 400px;
  }
  img {
    display: block;
    width: 92px;
    margin: 28px auto 25px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
    img {
      width: 70%;
    }
    .el-submenu {
      &.is-open {
        > .el-submenu__title {
          background-color: red;
        }
      }
    }
  }
}
</style>