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
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
              v-model="data_value"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
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
        <el-button type="danger" style="width: 100%">搜索</el-button>
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="catagory" label="类别" width="130">
      </el-table-column>
      <el-table-column prop="data" label="日期" width="237"> </el-table-column>
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
          :total="4"
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
      @closed="dialog_info = false"
    ></dialog-info>
  </div>
</template>

<script>
import { global3 } from '@/utils/global3.0.js'
import { reactive, ref } from "@vue/composition-api";
import DialogInfo from "../../components/DialogInfo.vue";
export default {
  name: "infoIndex",
  components: {
    DialogInfo,
  },
  setup(props, { root }) {
    const category_value = ref("");
    const data_value = ref("");
    const search_key = ref("1");
    const search_keyWork = ref("");
    const dialog_info = ref(false);

    const searchOptions = reactive([
      {
        value: "1",
        label: "ID",
      },
      {
        value: "2",
        label: "标题",
      },
    ]);
    const options = reactive([
      {
        value: "1",
        label: "国际信息",
      },
      {
        value: "2",
        label: "国内信息",
      },
      {
        value: "3",
        label: "行内信息",
      },
    ]);
    const tableData = reactive([
      {
        title: "太阳4-2快船进总决赛 保罗41+8刷爆纪录乔治21+9",
        catagory: "国外信息",
        data: "2021-7-1 13:14:32",
        user: "管理员",
      },
      {
        title: "太阳重返总决赛 艰难重建他们到底做对了什么？",
        catagory: "国外信息",
        data: "2021-7-1 13:14:32",
        user: "管理员",
      },
      {
        title: "保罗打破魔咒踏上总决赛 命运终于向控卫之神微笑",
        catagory: "国外信息",
        data: "2021-7-1 13:14:32",
        user: "管理员",
      },
      {
        title: "太阳顶级3D成超级福将 连续两年杀入总决赛",
        catagory: "国外信息",
        data: "2021-7-1 13:14:32",
        user: "管理员",
      },
    ]);

    const { confirm } = global3()

    const handleSizeChange = (val) => {
      page.pageSize = val;
    };
    const handleCurrentChange = (val) => {
      page.pageNumber = val;
      getList();
    };
    const deleteItem = (id) => {
      root.confirm({
        content: "是否确认删除?",
        fn: "confirmDelete",
        id: 222
      })
    };
    const deleteAll = () => {
      confirm({
        content: "删除全部, 是否继续?",
        fn: confirmDelete,
        id: 111
      })
    };
    const confirmDelete = (value) => {
      
    }
    return {
      options,
      category_value,
      data_value,
      search_key,
      searchOptions,
      search_keyWork,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      dialog_info,
      deleteItem,
      deleteAll
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