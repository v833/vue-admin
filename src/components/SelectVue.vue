<template>
    <el-select v-model="data.selectValue" placeholder="请选择">
      <el-option
        v-for="item in data.initOption"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "SelectVue",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    selectData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        { value: "truename", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" },
      ],
    });


    // 初始化下拉选择
    const initOption = () => {
      let initData = props.config.init;
      let optionArr = [];
      // 数据检验
      if (initData.length === 0) {
        console.log("config的参数是空的，无法显示下拉菜单；");
        return false;
      }
      initData.forEach((item) => {
        let arr = data.option.filter((elem) => elem.value == item); // filter匹配成功后是一个数组，需要取下标第一个
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 数据检验
      if (optionArr.length === 0) {
        console.log("匹配的数据为空！");
        return false;
      }
      // 初始化赋值
      data.initOption = optionArr;
      // 初始化搜索类型
      data.selectValue = optionArr[0].value;
      // 返回初始值
      emit("update:selectData", optionArr[0]);
    };

    // 选择触发
    const select = (val) => {
      let filterData = data.option.filter((item) => item.value == val)[0];
      emit("update:selectData", filterData);
    };

    // 组件挂载完成时
    onMounted(() => {
      
      initOption();
    });
    return {
      data,
      select,
    };
  },
};
</script>
