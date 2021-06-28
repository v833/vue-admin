<template>
  <div id="main-wrap">
    LayoutMain
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LayoutMain'
}
</script>

<style lang="scss">
  #main-wrap {
    position: fixed;
    left: $navMenu;
    top: 75px;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    border: 30px solid #f7f7f7;
    border-bottom: none
  }
</style>