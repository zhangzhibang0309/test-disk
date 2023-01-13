<template>
  <div class="upload-btn">
    <el-upload
      style="display: inline"
      action="/goodsTable"
      :auto-upload="false"
      ref="upload"
      :http-request="uploadHttpRequest"
    >
      <el-button type="primary" slot="trigger">选择文件</el-button>
      <el-button icon="el-icon-upload2" type="primary" @click="submitUpload">
        上传到服务器
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import service from "@/api/request";
export default {
  methods: {
    uploadHttpRequest(param) {
      // FormData对象，添加参数只能通过append('key', value)的形式添加
      const formData = new FormData();
      // 添加文件对象
      formData.append("file", param.file);
      formData.append("userViewPath", this.$refs.filePathInputRef.value);
      service({
        url: "/common/upload",
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style>
.upload-btn {
  display: inline-block;
}
</style>