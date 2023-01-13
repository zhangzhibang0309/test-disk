<template>
  <div id="home">
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <CommonAside />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
export default {
  components: { CommonHeader, CommonAside },
  mounted() {
    // 同步当前路由和menuAside
    this.$store.commit("changeCurActive", this.$route.path);
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  .el-container {
    // display: flex;
    width: 100%;
    height: 100%;
    .el-header {
      width: 100%;
      z-index: 1;
      width: 100%;
      // background-color: skyblue;
      box-shadow: 0 0 10px 10px rgb(250, 192, 255);
    }
    .el-container {
      width: 100%;
      height: 100%;
      .el-aside {
        // background-color: pink;
      }
      .el-main {
        // background-color: greenyellow;
      }
    }
  }
}
</style>
