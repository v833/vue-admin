<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutMain",
};
</script>

<style lang="scss">
#main-wrap {
  height: 100vh;
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // box-sizing: border-box;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  .main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-left: $navMenu + 30;
    padding-right: 30px;
    box-sizing: border-box;
    .content {
      width: 100%;
      height: 100%;
      padding: 30px 30px 0 30px;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
}
</style>