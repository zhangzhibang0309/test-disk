<template>
  <div class="login" id="login-app">
    <div class="login-box">
      <img src="../assets/images/login/login-l.png" alt="" />
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <div class="login-form-title">
            <img
              src="../assets/images/login/logo.png"
              style="width: 139px; height: 42px"
              alt=""
            />
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
              maxlength="20"
              prefix-icon="iconfont icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              prefix-icon="iconfont icon-lock"
              maxlength="20"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              size="medium"
              type="primary"
              style="width: 100%"
              @click="handleLogin"
            >
              <span v-if="!loading">登录</span>
              <span v-else>登录中...</span>
            </el-button>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              class="register-btn"
              size="medium"
              type="primary"
              style="width: 100%"
              @click="handleRegister"
            >
              <span>注册</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { loginApi } from "../api/login";
import { loginApi } from "@/api/login";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      loginForm: {
        username: "seon",
        password: "8023u8023U",
      },
      loading: false,
    };
  },
  computed: {
    loginRules() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入用户名"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      };
    },
  },
  created() {},
  methods: {
    async handleRegister() {
      // this.$message("注册页面暂未完成");
      this.$router.push({ path: "/register" });
    },

    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            let { data } = await loginApi(this.loginForm);
            // console.log("res", data);

            if (data.token) {
              Cookie.set("token", data.token);
              this.$router.push({ path: "/home" });
            }
          } catch (error) {
            // console.log("error", error);
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.body {
  min-width: 1366px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #333;
}
.login-box {
  width: 1000px;
  height: 474.38px;
  border-radius: 8px;
  display: flex;
}

.login-box img {
  width: 60%;
  height: auto;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  background: #ffffff;
  width: 40%;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form .el-form {
  width: 214px;
  height: 307px;
}
.login-form .el-form-item {
  margin-bottom: 30px;
}
.login-form .el-form-item.is-error .el-input__inner {
  border: 0 !important;
  border-bottom: 1px solid #fd7065 !important;
  background: #fff !important;
}
.login-form .input-icon {
  height: 32px;
  width: 18px;
  margin-left: -2px;
}
.login-form .el-input__inner {
  border: 0;
  border-bottom: 1px solid #e9e9e8;
  border-radius: 0;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  height: 32px;
  line-height: 32px;
}
.login-form .el-input__prefix {
  left: 0;
}
.login-form .el-input--prefix .el-input__inner {
  padding-left: 26px;
}
.login-form .el-input__inner::placeholder {
  color: #aeb5c4;
}
.login-form .el-form-item--medium .el-form-item__content {
  line-height: 32px;
}
.login-form .el-input--medium .el-input__icon {
  line-height: 32px;
}
.login-btn {
  border-radius: 17px;
  padding: 11px 20px !important;
  margin-top: 10px;
  font-size: 14px;
  border: 0;
  background-color: #ffc200;
}

.register-btn {
  border-radius: 17px;
  border: 0;
}
.login-form-title {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.login-form-title .title-label {
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  margin-left: 10px;
}
</style>
