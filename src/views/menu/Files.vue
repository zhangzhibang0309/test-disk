<template>
  <div class="files">
    <div class="operation-menu-wrapper">
      <!-- 新建文件夹和上传文件 -->
      <el-button-group class="left">
        <NewFolder
          :newFolderData="newFolderData"
          @newFolderRenderFileList="renderFileList"
        ></NewFolder>
        <UploadFile />
      </el-button-group>
      <!-- 全局搜索文件 -->
      <Search class="right" />
    </div>
    <!-- 当前路径 -->
    <div class="location">
      <div class="title">当前位置：</div>
      <el-input
        class="file-path-input"
        ref="filePathInputRef"
        placeholder="请输入路径"
        v-model="inputFilePath"
        size="mini"
        :autofocus="true"
        @blur="handleInputBlurEnter"
        @change="handleInputBlurEnter"
      ></el-input>
    </div>
    <!-- 数据table -->
    <FileTable
      :fileTableData="fileTableData"
      @render="render"
      @changeIskeep="changeIskeep"
    >
      <template v-slot:renameOperate="scope">
        <Operate
          :operateData="{
            name: '重命名',
            index: scope.index,
            tableData: tableData,
            inputFilePath: inputFilePath,
            request: rename,
            renderFileList,
          }"
          @stopDblClick="stopDblClick"
          @render="render"
        >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            circle
            plain
          ></el-button>
        </Operate>
      </template>
      <template v-slot:operate="scope">
        <!-- 复制 -->
        <Operate
          :operateData="{
            name: '复制',
            index: scope.index,
            tableData,
            inputFilePath,
            request: copy,
            renderFileList,
          }"
          @stopDblClick="stopDblClick"
          @render="render"
        >
          <el-button type="primary" size="mini" plain>复制</el-button>
        </Operate>
        <!-- 移动 -->
        <Operate
          :operateData="{
            name: '移动',
            index: scope.index,
            tableData,
            inputFilePath,
            request: move,
            renderFileList,
          }"
          @stopDblClick="stopDblClick"
          @render="render"
          ><el-button type="success" size="mini" plain>移动</el-button>
        </Operate>
        <!-- 删除 -->
        <Operate
          :operateData="{
            name: '删除',
            index: scope.index,
            tableData,
            inputFilePath,
            request: {
              deleteFolder,
              deleteFile,
            },
            renderFileList,
          }"
          @stopDblClick="stopDblClick"
          @render="render"
        >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </Operate>
      </template>
    </FileTable>
  </div>
</template>

<script>
import Operate from "../../components/fileManage/Operate.vue";
import FileTable from "../../components/fileManage/FileTable.vue";
import NewFolder from "../../components/fileManage/NewFolder.vue";
import UploadFile from "../../components/fileManage/UploadFile.vue";
import Search from "../../components/fileManage/Search.vue";

import { deleteFolder, deleteFile } from "@/api/delete";
import { copy, getFileList, move, rename } from "@/api/list";

export default {
  components: { Operate, FileTable, NewFolder, UploadFile, Search },
  data() {
    return {
      tableData: [], // file数据
      inputFilePath: "/", //  当前路径
      isKeep: true, // 解决click和dblclick冲突
    };
  },
  computed: {
    fileTableData() {
      return {
        tableData: this.tableData,
        inputFilePath: this.inputFilePath,
        isKeep: this.isKeep,
      };
    },
    newFolderData() {
      return {
        inputFilePath: this.inputFilePath,
      };
    },
  },
  mounted() {
    this.renderFileList(this.inputFilePath);
  },
  methods: {
    // api注册到全局
    copy,
    move,
    rename,
    deleteFolder,
    deleteFile,
    // 公共函数
    async renderFileList(path) {
      let res = await getFileList(path);
      this.tableData = res.data;
    },
    stopDblClick(isKeep) {
      this.isKeep = isKeep;
    },
    changeIskeep(isKeep) {
      this.isKeep = isKeep;
    },
    //  路径输入框失去焦点或用户按下回车时触发
    handleInputBlurEnter() {
      this.isShowInput = false;
      if (this.inputFilePath !== this.filePath) {
        this.$router.push({
          query: { filePath: `${this.inputFilePath}/`, fileType: 0 },
        });
        this.renderFileList(this.inputFilePath);
      }
    },
    // FileTable组件事件
    render(newPath) {
      this.inputFilePath = newPath;
      this.renderFileList(newPath);
    },
  },
};
</script>

<style lang="less" scoped>
.files {
  width: 100%;
  height: 100%;
  background: pink;
  .operation-menu-wrapper {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      margin-right: 88px;
    }
  }
  .location {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 100px;
      text-align: center;
    }
  }
}
</style>
