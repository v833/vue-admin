<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px" class="demo-ruleForm">
      <el-form-item label="信息分类：">
        <el-select v-model="form.categoryId">
          <el-option
            v-for="item in data.category"
            :key="item.id"
            :value="item.id"
            :label="item.category_name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻标题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="缩略图：">
        <!-- <UploadImg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig" /> -->
        <el-upload
          class="avatar-uploader"
          action="https://up-z1.qiniup.com"
          :data="data.uploadKey"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker
          v-model="form.createDate"
          type="date"
          placeholder="选择日期"
          disabled
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容：">
        <quill-editor
          v-model="form.content"
          ref="myQuillEditor"
          :options="data.editorOption"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit" :loading="data.submitLoading"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common, qiniuToKen } from "@/api/common.js";
import { timestampToTime } from "@/utils/common";
import { getList, editInfo } from "@/api/news";
import {
  onActivated,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";
// 富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "InfoDetailed",
  components: {
    quillEditor,
  },
  setup(props, { root }) {
    const { getInfoCategory, categoryItem } = common();


    const data = reactive({
      id: root.$route.query.id,
      category: [],
      editorOption: {},
      submitLoading: false,
      uploadKey: {
        toKen: '',
        key: ''
      }
    });
    const form = reactive({
      categoryId: "",
      title: "",
      createDate: "",
      content: "",
      imgUrl: "",
    });
    const submit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl,
      };
      data.submitLoading = true;
      editInfo(requestData)
        .then((response) => {
          let responseData = response;
          root.$message({
            message: responseData.message,
            type: "success",
          });
          data.submitLoading = false;
        })
        .catch((error) => {
          data.submitLoading = false;
        });
    };
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id,
      };
      getList(requestData).then((response) => {
        let responseData = response.data.data[0];
        form.categoryId = responseData.categoryId;
        form.title = responseData.title;
        form.createDate = timestampToTime(responseData.createDate);
        form.content = responseData.content;
        form.imgUrl = responseData.imgUrl;
      });
    };
    const getQiniuToken = () => {
      let requestData = {
        ak: 'tF5f7dOHpLYninhYZjwDsFxl1_S1SXt0fKzViZ8q',
        sk: 'cEcBI2UXTZOGgVTIwo_R8hoKhxIKv0mCqA5HSHW2',
        buckety: 'toototoovue'
      }
      qiniuToKen(requestData)
        .then((res) => {
          data.uploadKey.toKen = res.data.token
      })
    }
    const handleAvatarSuccess = (res, file) => {
      console.log(res, file);
      form.imgUrl = URL.createObjectURL(file.raw);
    };
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 文件名转码
      let suffix = file.name
      let key = encodeURI(`${suffix}`)
      data.uploadKey.key = key
      return isJPG && isLt2M;
    };

    onMounted(() => {
      getInfoCategory();
      getInfo();
      getQiniuToken()
    });
    onActivated(() => {});

    watch(
      () => categoryItem.item,
      (value) => {
        data.category = value;
      }
    );

    return {
      data,
      form,
      submit,
      handleAvatarSuccess,
      beforeAvatarUpload,
    };
  },
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>