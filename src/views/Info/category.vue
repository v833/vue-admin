<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({ type: 'category_first_add' })"
      >添加一级分类</el-button
    >
    <div>
      <hr class="hr-e9e9e9" />
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              v-for="firstItem in category.item"
              :key="firstItem.id"
            >
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    round
                    @click="
                      editCategory({
                        data: firstItem,
                        type: 'category_first_edit',
                      })
                    "
                    >编辑</el-button
                  >
                  <el-button size="mini" type="success" round
                    >添加子集</el-button
                  >
                  <el-button
                    size="mini"
                    type=""
                    round
                    @click="deleteCategoryComfirm(firstItem.id)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <ul v-if="firstItem.children">
                <li
                  v-for="childrenItem in firstItem.children"
                  :key="childrenItem.id"
                >
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" type="" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
            <el-form-item
              label="一级分类名称："
              prop="categoryName"
              v-if="category_first_input"
            >
              <el-input
                v-model="form.categoryName"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="二级分类名称："
              prop="secCategoryName"
              v-if="category_children_input"
            >
              <el-input
                v-model="form.secCategoryName"
                :disabled="category_children_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_button_disabled"
                :disabled="submit_button_disabled"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {common} from '@/api/common.js'
import { global3 } from "@/utils/global3.0.js";
import {
  addFirstCategory,
  deleteCategory,
  editCategory as EditCategory,
} from "@/api/news";
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import SvgIcon from "../../components/SvgIcon.vue";
export default {
  components: { SvgIcon },
  name: "category",
  setup(props, { root }) {
    const { confirm } = global3();
    const { getInfoCategory, categoryItem } = common();


    const form = reactive({
      categoryName: "",
      secCategoryName: "",
    });
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const submit_button_loading = ref(false);
    const submit_button_disabled = ref(true);
    const category_children_disabled = ref(true);
    const category_first_disabled = ref(true);
    const deleteId = ref("");
    const subit_button_type = ref("");

    const category = reactive({
      item: [],
      current: [],
    });

    const submit = () => {
      if (subit_button_type.value === "category_first_add") {
        pushFirstCategory();
      }
      if (subit_button_type.value == "category_first_edit") {
        changeFirstCategory();
      }
      if (subit_button_type.value == "category_children_add") {
        addChildrenCategory();
      }
    };
    const pushFirstCategory = () => {
      if (!form.categoryName) {
        root.$message.error("分类名称不能为空");
        return;
      }
      submit_button_loading.value = true;
      addFirstCategory({ categoryName: form.categoryName })
        .then((res) => {
          root.$message.success(res.message);
          category.item.push(res.data);
        })
        .catch((err) => {})
        .finally(() => {
          submit_button_loading.value = false;
          form.categoryName = "";
          form.secCategoryName = "";
        });
    };
    const changeFirstCategory = () => {
      if (category.current.length == 0) {
        root.$message({
          message: "未选择分类！！",
          type: "error",
        });
        return false;
      }
      let requestData = {
        id: category.current.id,
        categoryName: form.categoryName,
      };
      EditCategory(requestData).then((response) => {
        let responseData = response;
        root.$message({
          message: responseData.message,
          type: "success",
        });
        category.current.category_name = responseData.data.data.categoryName;
        // getInfoCategoryAll();
        // 清空输入框
        form.categoryName = "";
        category.current = [];
      });
    };
    const addChildrenCategory = () => {
      if (!form.secCategoryName) {
        root.$message({
          message: "子级分类名称不能为空！！",
          type: "error",
        });
        return false;
      }
      let requestData = {
        categoryName: form.secCategoryName,
        parentId: category.current.id,
      };
      AddChildrenCategory(requestData).then((response) => {
        let responseData = response.data;
        root.$message({
          message: responseData.message,
          type: "success",
        });
        // 调用分类列表接口
        getInfoCategoryAll();
        // 清空子级输入框内容
        form.secCategoryName = "";
      });
    };
    const addFirst = (params) => {
      subit_button_type.value = params.type;
      category_first_input.value = true;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
    };
    const deleteCategoryComfirm = (id) => {
      deleteId.value = id;
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！！",
        tip: "警告",
        fn: delCategory,
        catchFn: () => {
          deleteId.value = "";
        },
      });
    };
    const delCategory = () => {
      deleteCategory({ categoryId: deleteId.value })
        .then(() => {
          let newData = category.item.filter(
            (item) => item.id !== deleteId.value
          );
          category.item = newData;
        })
        .catch((err) => {});
    };
    const editCategory = (params) => {
      subit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      // 一级名称输入还原名称
      form.categoryName = params.data.category_name;
      // 储存当前数据对象
      category.current = params.data;
    };
    onMounted(() => {
      getInfoCategory()
    });

    watch(() => categoryItem.item, (value) => {
      category.item = value
    })
    return {
      form,
      submit,
      category_first_input,
      category_children_input,
      category_first_disabled,
      category_children_disabled,
      submit_button_loading,
      submit_button_disabled,
      addFirst,
      category,
      deleteCategoryComfirm,
      editCategory,
      subit_button_type,
    };
  },
};
</script>

<style lang="scss">
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: -20px;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
    z-index: 2;
    &:first-child {
      top: 23px;
    }
  }
  h4 {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      left: 14px;
      top: 10px;
      font-size: 18px;
    }
  }
  li {
    position: relative;
    padding-left: 36px;
    // margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: -17px;
      top: 20px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  button {
    font-size: 12px;
  }
}
.from-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>