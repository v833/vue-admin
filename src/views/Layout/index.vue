<template>
  <div id="layout" :class="menuStatus ? 'close' : 'open'">
    layout
    <layout-header/>
    <LayoutMain />
    <layout-nav/>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
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
    const menuStatus = computed(() => root.$store.state.isCollapse)

    return {
      menuStatus
    }
  }

}
</script>

<style lang="scss">
  #layout {
    background-color: #f7f7f7;
  }
</style>