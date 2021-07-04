<template>
  <el-dialog
    :title="title"
    :visible.sync="data.dialog_info_flag_edit"
    @close="close"
    width="580px"
    @opened="openDialog"
  >
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item
        label="类别："
        :label-width="data.formLabelWidth"
        prop="category"
      >
        <el-select v-model="data.form.category" placeholder="请选择活动区域">
          <el-option
            v-for="item in data.categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="标题："
        :label-width="data.formLabelWidth"
        prop="title"
      >
        <el-input v-model="data.form.title" placehoder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item
        label="概况："
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <el-input
          type="textarea"
          v-model="data.form.content"
          placehoder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="data.submitLoading" @click="submit"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { addInfo, getList, editInfo } from "@/api/news";
import { reactive, ref, watch, watchEffect } from "@vue/composition-api";
export default {
  name: "dialogInfoEdit",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
    },
  },
  setup(props, { emit, root, refs }) {
    /**
     * 数据
     */
    const data = reactive({
      dialog_info_flag_edit: false, // 弹窗标记
      formLabelWidth: "70px",
      form: {
        category: "",
        title: "",
        content: "",
      },
      // 分类下拉
      categoryOption: [],
      // 按钮加载
      submitLoading: false,
    });
    // watch
    // watch(() => data.dialog_info_flag_edit = props.flag);
    /**
     * vue2.0 methods
     */
    const close = () => {
      data.dialog_info_flag_edit = false;
      resetForm();
      emit("update:flag", false);
    };
    const openDialog = () => {
      data.categoryOption = props.category;
      getInfo();
    };
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: props.id,
      };
      getList(requestData).then((response) => {
        let responseData = response.data.data[0];
        data.form = {
          category: responseData.categoryId,
          title: responseData.title,
          content: responseData.content,
        };
      });
    };
    const resetForm = () => {
      refs.addInfoForm.resetFields();
      // data.form.category = ''
      // data.form.title = ''
      // data.form.content = ''
    };
    const submit = () => {
      let requestData = {
        id: props.id,
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
      };
      if (!data.form.category) {
        root.$message({
          message: "分类不能为空！！",
          type: "error",
        });
        return false;
      }
      data.submitLoading = true;
      editInfo(requestData)
        .then((response) => {
          let responseData = response;
          root.$message({
            message: responseData.message,
            type: "success",
          });
          /**
           * 两种刷新数据方式
           * 1、暴力型，直接刷新接口
           * 2、返回列表，手动修改指定的数据
           */
          emit("getListEmit");
          // 重置表单
          // resetForm()
          // root.$refs['addInfoForm'].resetFields();
        })
        .catch((error) => {})
        .finally(() => {
          data.submitLoading = false;
        });
    };
    return {
      data,
      close,
      openDialog,
      submit,
    };
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.data.dialog_info_flag_edit = newValue;
      },
      immediate: true
    },
  },
};
</script>
<style scoped>
</style>