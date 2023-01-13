<template>
  <div>
    <el-table
      style="width: 100%"
      type="index"
      :data="fileTableData.tableData"
      :header-cell-style="headerCellStyle"
      :row-class-name="tableRowClassName"
      @cell-dblclick="handledbClick"
    >
      <el-table-column label="" width="80" prop="isFolder">
        <template slot-scope="scope">
          <i
            :class="
              scope.row.isFolder == 0
                ? 'el-icon-document'
                : 'el-icon-folder-opened'
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="fileName" label="名称" width="180">
        <template slot-scope="scope">
          <!-- 重命名 -->
          <slot name="renameOperate" :index="scope.$index"></slot>
          <span>{{ fileTableData.tableData[scope.$index].fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileSize" label="大小" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <slot name="operate" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { download } from "@/api/list";

export default {
  props: ["fileTableData"],
  data() {
    return {
      headerCellStyle: { background: "skyblue" },
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    async handledbClick(event) {
      if (!this.fileTableData.isKeep) {
        this.$emit("changeIskeep", true);
      } else {
        let item = this.fileTableData.tableData[event.index];
        let isFolder = item.isFolder;
        if (!!isFolder) {
          // 如果是文件夹
          this.fileTableData.inputFilePath += event.filePath + "/";
          // 渲染 就像这里一样 那个操作按钮组件是一开始写的 当时没有想好
          this.$emit("render", this.fileTableData.inputFilePath);
        } else {
          // 如果是文件
          let fileName = item.fileName;

          let fileId = item.id;
          let res = await download({ id: fileId });

          const href = URL.createObjectURL(res.data);
          const a = document.createElement("a");
          a.download = fileName;
          a.href = href;
          a.click();
        }
      }
    },
  },
};
</script>

<style>
</style>