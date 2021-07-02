import { getCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";
export function common() {
  const categoryItem = reactive({
    item: []
  });
  /**
   * 获取分类
   */
  const getInfoCategory = () => {
    getCategory({})
      .then(response => {
        categoryItem.item = response.data.data;
      })
      .catch(error => {
        root.$message.error(error)
      });
  };

  /**
   * 获取全部分类
   */
  // const getInfoCategoryAll = () => {
  //   GetCategoryAll({})
  //     .then(response => {
  //       categoryItem.item = response.data.data;
  //     })
  //     .catch(error => {});
  // };

  return {
    getInfoCategory,
    // getInfoCategoryAll,
    categoryItem
  };
}
