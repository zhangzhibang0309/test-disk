<template>
  <div class="operate-btn">
    <span @click="handle">
      <slot></slot>
    </span>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="inputTargetPath" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDialogVisible">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["operateData"],
  data() {
    return {
      dialogVisible: false,
      inputTargetPath: "",
    };
  },
  methods: {
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
    },
    async handle() {
      // 阻断dblclick冲突
      this.$emit("stopDblClick", false);

      // 如果是删除->那直接调用接口
      // 如果不是删除->那只是弹框
      if (
        this.operateData.name === "删除" ||
        this.operateData.name === "永久删除"
      ) {
        // 这里的inputFilePath，对于bin页面来说，它其实是一个curPage，并不是一个路径，现在有一点兼容性问题
        let path = `${this.operateData.inputFilePath}${
          this.operateData.tableData[this.operateData.index].filePath
        }`;
        let item = this.operateData.tableData[this.operateData.index];
        let isFolder = item.isFolder;
        if (!!isFolder) {
          // 如果是文件夹
          await this.operateData.request.deleteFolder(path);
        } else {
          // 如果是文件
          const ids = item.id;
          this.operateData.name === "永久删除"
            ? await this.operateData.request({ ids })
            : await this.operateData.request.deleteFile({ ids });
        }
        // 渲染
        // 这个
        this.$emit("render", this.operateData.inputFilePath);
      } else if (this.operateData.name === "恢复") {
        let item = this.operateData.tableData[this.operateData.index];
          const ids = item.id;
        await this.operateData.request({ ids });
        this.$emit("render", this.operateData.inputFilePath);
      } else {
        this.changeDialogVisible();
      }
    },
    async confirm() {
      let path = `${this.operateData.inputFilePath}${
        this.operateData.tableData[this.operateData.index].filePath
      }`;
      await this.operateData.request(path, this.inputTargetPath);
      this.$emit("render", this.operateData.inputFilePath);
      this.changeDialogVisible();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
.operate-btn {
  display: inline-block;
}
</style>