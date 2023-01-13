<template>
  <div>
    <FileTable :fileTableData="fileTableData">
      <template v-slot:operate="scope">
        <!-- 恢复 -->
        <Operate
          :operateData="{
            name: '恢复',
            index: scope.index,
            tableData,
            inputFilePath: currentPage,
            request: recovery,
          }"
          @render="render"
        >
          <el-button type="primary" size="mini" plain>恢复</el-button>
        </Operate>
        <!-- 删除 -->
        <Operate
          :operateData="{
            name: '永久删除',
            index: scope.index,
            tableData,
            inputFilePath: currentPage,
            request: deleteRecycle,
          }"
          @render="render"
        >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </Operate>
      </template>
    </FileTable>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="6"
      :total="fileTotal"
      @current-change="changeCurrentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import FileTable from "../../components/fileManage/FileTable.vue";
import Operate from "../../components/fileManage/Operate.vue";

import { recycleFileList, deleteRecycle, recovery } from "@/api/recycle";
export default {
  components: { FileTable, Operate },
  data() {
    return {
      tableData: [],
      fileTotal: 0,
      currentPage: 1,
    };
  },
  computed: {
    fileTableData() {
      return {
        tableData: this.tableData,
      };
    },
  },
  methods: {
    deleteRecycle,
    recovery,
    async renderRecycleFileList(curPage) {
      let res = await recycleFileList({
        currentPage: curPage,
        pageSize: 6,
      });
      this.tableData = res.data.records;
      this.fileTotal = res.data.total;
    },
    changeCurrentPage(curPage) {
      this.currentPage = curPage;
      this.renderRecycleFileList(curPage);
    },
    render(curPage) {
      this.changeCurrentPage(curPage);
    },
  },
  mounted() {
    // 获取回收站文件总数
    // this.fileTotal = xxx
    // 获取当前页的数据 需要当前页的参数
    this.renderRecycleFileList(1);
  },
};
</script>

<style>
</style>