<template>
  <el-menu
    :default-active="$store.state.curActive"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index="/home/files">
      <i class="el-icon-menu"></i>
      <span slot="title">我的文件</span>
    </el-menu-item>
    <el-menu-item index="/home/bin">
      <i class="el-icon-menu"></i>
      <span slot="title">回收站</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>