<template>
  <div>
    <el-table :data="data.tableData.item" border style="width: 100%" @selection-change="thatSelectCheckbox">
      <!-- 多选框 -->
      <el-table-column
        v-show="data.tableConfig.selection"
        type="selection"
        width="55"
      ></el-table-column>
      <!-- 文本数据内容 -->
      <template v-for="item in data.tableConfig.tHead">
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType === 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
    <div class="black-space-30"></div>
    <div class="table-footer">
      <el-col :span="4">
        <slot name="tableFooterLeft"></slot>
      </el-col>
      <el-col :span="20">
        <el-pagination
        class="pull-right"
          v-if="data.tableConfig.pagiation"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.currentPage"
          :page-sizes="pageData.pageSizes"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total"
          background
        >
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl.js";
import { loadTableData } from "@/api/common";
export default {
  name: "TableVue",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    tableRow: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const pageData = reactive({
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
    });

    const data = reactive({
      tableData: {
        item: [],
        total: 0,
      },
      tableConfig: {
        selection: true,
        recoadCheckbox: true,
        tHead: [],
        requestData: "",
        pagiation: true,
      },
    });

    const loadData = () => {
      let requestJson = data.tableConfig.requestData;
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data,
      };
      loadTableData(requestData)
        .then((res) => {
          let responseData = res.data.data;
          data.tableData.item = responseData;
          data.tableData.total = responseData.length === 0 ? 0 : res.data.total;
          totalCount(data.tableData.total);
        })
        .catch((err) => {
          root.$message.error(err);
        });
    };
    const initTableConfig = () => {
      let configData = props.config;
      for (let k in configData) {
        if (data.tableConfig.hasOwnProperty(k)) {
          data.tableConfig[k] = configData[k];
        }
      }
    };
    const handleSizeChange = (val) => {
      pageData.currentPage = val;
    };
    const totalCount = (val) => {
      pageData.total = val;
    };
    const handleCurrentChange = (val) => {
      pageData.pageSize = val;
    };
    const recordPage = () => {};
    const tableLoadData = () => {};
    const thatSelectCheckbox = (val) => {
      let rowData = {
        idItem: val.map(item => item.id)
      }
      emit('update:tableRow', rowData)
    }

    watch(
      () => data.tableData,
      (newValue) => {
        data.tableData = newValue;
      }
    );
    watch(
      [() => pageData.currentPage, () => pageData.pageSize],
      ([currentPage, pageSize]) => {
        let requestData = data.tableConfig.requestData;
        if (requestData.data) {
          requestData.data.pageNumber = currentPage;
          requestData.data.pageSize = pageSize;
          requestData.url = "/user/getList/";
          console.log(data.tableConfig.requestData);
          loadTableData(data.tableConfig.requestData);
        }
      }
    );
    onMounted(() => {
      initTableConfig();
      loadData();
    });
    return {
      data,
      pageData,
      handleSizeChange,
      handleCurrentChange,
      thatSelectCheckbox
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/config.scss";
@import "@/styles/main.scss";
</style>
