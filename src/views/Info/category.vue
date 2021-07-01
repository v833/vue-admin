<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <div>
      <hr class="hr-e9e9e9" />
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round
                    >添加子集</el-button
                  >
                  <el-button size="mini" type="" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" type="" round>删除</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
            <div class="category">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
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
                :loading="submit_button_loading"
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
import { reactive } from '@vue/composition-api';
import SvgIcon from "../../components/SvgIcon.vue";
export default {
  components: { SvgIcon },
  name: "category",
  setup(props, { root }) {
    const categoryFrom = reactive({
      name: '',
      region: '',
      type: ''
    })


    return {
      categoryFrom
    }
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