<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap">
          <label>关键字：</label>
          <div class="warp-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <SelectVue
                  :config="data.configOption"
                  :selectData.sync="data.selectData"
                />
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="data.key_word"
                  placeholder="请输入搜索的关键字"
                ></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="danger" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="handlerAdd"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <table-vue
      :config="data.configTable"
      ref="userTable"
      :tableRow.sync="data.tableRow"
    >
      <template v-slot:status="slotProps">
        <el-switch
          @change="handlerSwitch(slotData.data)"
          v-model="slotProps.data.status"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </template>

      <template #operation="slotProps">
        <el-button
          size="small"
          type="danger"
          @click="handlerDel(slotProps.data)"
          >删除</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="handlerEdit(slotProps.data)"
          >编辑</el-button
        >
      </template>
      <template v-slot:tableFooterLeft>
        <el-button size="small" @click="handlerBatchDel()">批量删除</el-button>
      </template>
    </table-vue>
    <DialogAdd
      :flag.sync="data.dialog_add"
      :editData="data.editData"
      @refreshTabelData="refreshData"
    />
  </div>
</template>

<script>
import SelectVue from "../../components/SelectVue.vue";
import { UserDel, UserActives } from "@/api/user";
import TableVue from "../../components/TableVue.vue";
import { reactive, ref } from "@vue/composition-api";
import DialogAdd from "./dialog/add.vue";
import { global3 } from "@/utils/global3.0";

export default {
  name: "userIndex",
  components: {
    SelectVue,
    TableVue,
    DialogAdd,
  },
  setup(props, { root, refs }) {
    const { confirm } = global3();
    const userTable = ref(null);
    const data = reactive({
      key_word: "",
      dialog_add: false,
      tableRow: {},
      editData: {},
      configOption: {
        init: ["truename", "phone"],
      },
      configTable: {
        // 多选框
        selection: false,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          {
            label: "邮箱/用户名",
            field: "username",
            width: 200,
          },
          {
            label: "真实姓名",
            field: "truename",
            width: 120,
          },
          {
            label: "手机号",
            field: "phone",
          },
          {
            label: "地区",
            field: "region",
          },
          {
            label: "角色",
            field: "role",
          },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status",
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation",
          },
        ],
        // 请求接口URL
        requestData: {
          url: "getUserList",
          method: "post",
          data: {
            pageNumber: 1,
            pageSize: 10,
          },
        },
        // 是否加载分页器
        pagiation: true,
      },
      selectData: {},
    });

    const handlerAdd = () => {
      data.dialog_add = true;
      // 子组件赋值
      data.editData = Object.assign({});
    };
    const search = () => {};
    const operation = (params) => {};
    const refreshData = () => {
      userTable.value.refreshData();
    };
        //     const refreshData = () => {
        //     tableLoadData(data.tableConfig.requestData);
        // }
    const handlerSwitch = (params) => {
      if (data.updateUserStatusFlag) {
        return false;
      }
      data.updateUserStatusFlag = true;
      UserActives({ id: params.id, status: params.status })
        .then((response) => {
          root.$message({
            message: response.data.message,
            type: "success",
          });
          data.updateUserStatusFlag = !data.updateUserStatusFlag;
        })
        .catch((error) => {
          data.updateUserStatusFlag = !data.updateUserStatusFlag;
        });
    };
    // 批量删除
    const handlerBatchDel = () => {
      let userId = data.tableRow.idItem;
      if (!userId || userId.length === 0) {
        root.$message({
          message: "请勾选需要删除的用户！！",
          type: "error",
        });
        return false;
      }
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！！",
        tip: "警告",
        fn: userDelete,
      });
    };
    // 单次删除
    const userDelete = () => {
      UserDel({ id: data.tableRow.idItem }).then((response) => {
        // 其中一种写法
        // refs.userTable.refreshData()
        // 第二种写法
        refreshData();
      });
    };
    const handlerDel = (params) => {
      data.tableRow.idItem = [params.id];
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！！",
        tip: "警告",
        fn: userDelete,
      });
    };
    const handlerEdit = (params) => {
      data.dialog_add = true;
      // 子组件赋值
      data.editData = Object.assign({}, params);
    };

    return {
      data,
      handlerAdd,
      search,
      operation,
      refreshData,
      handlerBatchDel,
      handlerDel,
      handlerSwitch,
      handlerEdit
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
@import "../../styles/main.scss";
.label-wrap {
  @include labelDom(left, 60, 40);
}
</style>