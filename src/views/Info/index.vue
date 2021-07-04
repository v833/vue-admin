<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="wrap-content">
            <el-select
              v-model="category_value"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%"
              v-model="date_value.item"
              type="datetimerange"
              align="right"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="search_key" style="width: 100%">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="search_keyWork"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          class="pull-right"
          style="width: 100%"
          @click="dialog_info = true"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格 -->
    <div class="black-space-30"></div>
    <el-table
      :data="table_data.item"
      border
      v-loading="loadingData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column
        prop="categoryId"
        label="类别"
        width="130"
        :formatter="toCategory"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="237"
        :formatter="toData"
      >
      </el-table-column>
      <el-table-column prop="user" label="管理员" width="115">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="editInfo(scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <!-- <el-dialog title="收货地址" :visible.sync="dialog_info">
      dialog
    </el-dialog> -->

    <dialog-info
      title="新增"
      :flag="dialog_info"
      :category="options.category"
      @closed="dialog_info = false"
      @getListEmit="pullList"
    ></dialog-info>
    <dialog-info-edit
      title="编辑"
      :flag.sync="dialog_info_edit"
      :category="options.category"
      @closed="dialog_info = false"
      @getListEmit="pullList"
      :id="infoId"
    ></dialog-info-edit>
  </div>
</template>

<script>
import { timestampToTime } from "@/utils/common.js";
import { getList, deleteInfo } from "@/api/news";
import { common } from "@/api/common.js";
import { global3 } from "@/utils/global3.0.js";
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import DialogInfo from "../../components/DialogInfo.vue";
import DialogInfoEdit from "../../components/DialogInfoEdit.vue";
export default {
  name: "infoIndex",
  components: {
    DialogInfo,
    DialogInfoEdit
  },
  setup(props, { root }) {
    const { confirm } = global3();
    const { getInfoCategory, categoryItem } = common();

    const category_value = ref("");
    const data_value = ref([]);
    const search_key = ref("id");
    const search_keyWork = ref("");
    const dialog_info = ref(false);
    const dialog_info_edit = ref(false)
    const total = ref(0);
    const loadingData = ref(false);
    const deleteInfoId = ref("");
    const date_value = reactive({
      item: []
    });
    const infoId = ref('')

    const searchOptions = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);
    const options = reactive({
      category: [],
    });
    const table_data = reactive({
      item: [],
    });
    const page = reactive({
      pageNumber: 1,
      pageSize: 10,
    });

    const handleSizeChange = (val) => {
      page.pageSize = val;
    };
    const handleCurrentChange = (val) => {
      page.pageNumber = val;
      getList();
    };
    const deleteItem = (id) => {
      deleteInfoId.value = [id];
      root.confirm({
        content: "是否确认删除?",
        fn: confirmDelete,
      });
    };
    const deleteAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value.length === 0) {
        root.$message.error("请选择要删除的数据！");
        return;
      }
      confirm({
        content: "删除全部, 是否继续?",
        fn: confirmDelete,
      });
    };
    const handleSelectionChange = (value) => {
      let ids = value.map((item) => item.id);
      deleteInfoId.value = ids;
    };
    const confirmDelete = (value) => {
      deleteInfo({ id: deleteInfoId.value })
        .then((res) => {
          deleteInfoId.value = "";
          pullList();
        })
        .catch((err) => {});
    };
    const pullList = () => {
      let requestData = formatData();
      loadingData.value = true;
      getList(requestData)
        .then((res) => {
          let data = res.data;
          table_data.item = data.data
          total.value = data.total
        })
        .catch((err) => {})
        .finally(() => {
          loadingData.value = false;
        });
    };
    const toData = (row, column, cellValue, index) => {
      return timestampToTime(row.createDate);
    };
    const toCategory = (row) => {
      let categoryId = row.categoryId;
      let categoryData = options.category.filter(
        (item) => item.id === categoryId
      )[0];
      if(!categoryData) { return false; }
      return categoryData.category_name;
    };
    const search = () => {
      let data = formatData();
      pullList(data);
    };
    const formatData = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      };
      // 分类ID
      if (category_value.value) {
        requestData.categoryId = category_value.value;
      }
      // 日期
      if (date_value.item.length > 0) {
        requestData.startTime = date_value.item[0];
        requestData.endTime = date_value.item[1];
      }
      // 关键字
      if (search_keyWork.value) {
        requestData[search_key.value] = search_keyWork.value;
      }
      return requestData;
    };
    const editInfo = (id) => {
      dialog_info_edit.value = true
      infoId.value = id

    };

    onMounted(() => {
      // 获取分类
      getInfoCategory();
      // root.$store.dispatch('VuexGetInfoCategory').then(res => {})
      // 获取列表
      pullList();
    });

    watch(
      () => categoryItem.item,
      (value) => {
        options.category = value;
      }
    );
    return {
      options,
      category_value,
      data_value,
      search_key,
      searchOptions,
      search_keyWork,
      table_data,
      handleSizeChange,
      handleCurrentChange,
      dialog_info,
      dialog_info_edit,
      deleteItem,
      deleteAll,
      total,
      loadingData,
      toData,
      toCategory,
      handleSelectionChange,
      search,
      date_value,
      editInfo,
      infoId,
      pullList
      
    };
  },
};
</script>

<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-work {
    @include labelDom(right, 80, 40);
  }
}
</style>