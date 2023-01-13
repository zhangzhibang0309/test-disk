<template>
  <div id="header">
    <div class="left">
      <img src="../assets/logo.png" alt="" />
      <span>奇文网盘</span>
    </div>
    <div class="right">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-user-solid"></i>
          {{ username }}
        </el-menu-item>
        <el-menu-item index="2" @click="dropdown">退出登录</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { logoutApi } from "@/api/login";

export default {
  data() {
    return {
      username: "xuexue",
      activeIndex: "0",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
    },
    async dropdown() {
      let data = await logoutApi();
      if (data.code === 200) {
        //清除cookie的token信息
        Cookie.remove("token");
      }
      //跳转到登录页面
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
#header {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  //   box-shadow: 0 10px 30px rgb(155, 155, 155);
  .left {
    padding: 30px;
    width: 200px;
    height: 60px;
    margin-left: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      font-size: 20px;
      font-weight: 700;
      color: rgb(243, 112, 255);
    }
  }
  .right {
    height: 100%;
  }
}
</style>
