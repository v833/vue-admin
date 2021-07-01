<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog_info_flag"
    @closed="closed"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类别：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.name" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "DialogInfo",
  setup(props, { root, emit }) {
    const dialog_info_flag = ref(false);
    const formLabelWidth = ref("70px") 

    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const closed = () => {
      dialog_info_flag.value = false;
      emit("closed");
    }

    return {
      dialog_info_flag,
      form,
      formLabelWidth,
      closed
    };
  },
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.dialog_info_flag = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>