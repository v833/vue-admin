import {
  ref
} from "@vue/composition-api";
import Vue from 'vue'
export function global3() {
  const str = ref('');
  const confirm = (data) => {
    Vue.prototype.$confirm(data.content, data.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: data.type || "warning",
        center: true
      }).then(() => {
        data.fn && data.fn(data.id || '')
        Vue.prototype.$message({
          type: "success",
          message: "删除成功!",
        });
      })
      .catch(() => {
        data.catchFn && data.catchFn()
        Vue.prototype.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }

  return {
    str,
    confirm
  }
}
