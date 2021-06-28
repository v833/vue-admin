<template>
  <div id="layout">
    layout
    <layout-header/>
    <LayoutMain />
    <layout-nav/>
  </div>
</template>

<script>
import LayoutHeader from '../../components/LayoutHeader.vue'
import LayoutMain from '../../components/LayoutMain.vue'
import LayoutNav from '../../components/LayoutNav.vue'

export default {
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup(props, {root}) {

  }
  
}
</script>

<style lang="scss">
  #layout {
    background-color: #f7f7f7;
  }
</style>