export default {
  install(Vue, options) {
    Vue.prototype.confirm = (data) => {
      Vue.prototype.$confirm(data.content, data.tip || "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: data.type || "warning",
          center: true
        }).then(() => {
          data.fn && data.fn(data.id)
          Vue.prototype.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          Vue.prototype.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  }
}
