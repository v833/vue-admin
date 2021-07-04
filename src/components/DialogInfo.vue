<template>
  <el-dialog
    :title="title"
    :visible.sync="data.dialog_info_flag"
    @closed="closed"
    @opened="openDialog"
    width="580px"
  >
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item label="类别：" :label-width="data.formLabelWidth">
        <el-select v-model="data.form.category" placeholder="请选择活动区域">
          <el-option
            v-for="item in categoryOption.item"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.title" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="概况：" :label-width="data.formLabelWidth">
        <el-input
          type="textarea"
          v-model="data.form.content"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closed">取 消</el-button>
      <el-button type="danger" @click="submit" :loading="data.submitLoading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addInfo } from "@/api/news";
import { onMounted, reactive, ref } from "@vue/composition-api";
export default {
  name: "DialogInfo",
  setup(props, { root, emit, refs }) {
    const data = reactive({
      dialog_info_flag: false, // 弹窗标记
      formLabelWidth: "70px",
      // 按钮加载
      submitLoading: false,
      form: {
        category: "",
        title: "",
        content: "",
      },
    });
    // 分类下拉
    const categoryOption = reactive({
      item: []
    });

    const closed = () => {
      data.dialog_info_flag = false;
      emit("closed");
    };
    const openDialog = () => {
      categoryOption.item = props.category;
    };
    const resetForm = () => {
      (data.form.category_id = ""),
        (data.form.title = ""),
        (data.form.content = "");
    };
    const submit = () => {
      let requestData = {
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
      };
      data.submitLoading = true;
      addInfo(requestData)
        .then((res) => {
          root.$message.success(res.message);
          emit('getListEmit');
        })
        .catch((err) => {
          root.$message.error(err);
        })
        .finally(() => {
          data.submitLoading = false;
          resetForm();
        });
    };

    onMounted(() => {});
    return {
      closed,
      openDialog,
      submit,
      data,
      categoryOption,
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
    category: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    flag: {
      handler (newValue, oldValue) {
        this.data.dialog_info_flag = newValue;
      },
      immediate: true
    },
  },
};
</script>

<style lang="scss" scoped>
</style>