<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { computed, ref } from "@vue/composition-api";

const req = require.context("@/assets/svg", false, /\.svg$/);
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);

export default {
  name: "SvgIcon",
  props: ["iconClass", "className"],
  setup(props, { root }) {
    // 计算属性，得出最终结果并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) return `svg-icon ${props.className}`;
      return "svg-icon";
    });
    return {
      iconName,
      svgClass,
    };
  },
};
</script>

<style lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    // 添加fill后可修改color
    fill: currentColor;
    color: white;
  }
</style>