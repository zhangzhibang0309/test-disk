<template>
  <div class="new-folder-btn">
    <el-button type="primary" icon="el-icon-plus" @click="handleOpen"
      >新建文件夹</el-button
    >
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="inputNewFolder"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFolderCancel">取 消</el-button>
        <el-button type="primary" @click="addFolderConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addFolder } from "@/api/list";
export default {
  props: ["newFolderData"],
  data() {
    return {
      dialogVisible: false,
      inputNewFolder: "",
    };
  },
  methods: {
    /** TODO: 抽离组件newFolder
     * 新建文件夹
     */
    // 改变dialogVisible
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 打开对话框
    handleOpen() {
      this.changeDialogVisible();
    },
    addFolderCancel() {
      this.changeDialogVisible();
    },
    async addFolderConfirm() {
      this.changeDialogVisible();

      await addFolder(this.newFolderData.inputFilePath, this.inputNewFolder);
      this.$emit("newFolderRenderFileList", this.newFolderData.inputFilePath);
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

<style>
.new-folder-btn {
  display: inline-block;
}
</style>