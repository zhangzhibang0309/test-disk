<template>
  <div class="register" id="register-app">
    <div class="register-box">
      <img src="../assets/images/login/login-l.png" alt="" />
      <div class="register-form">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="loginRules"
        >
          <div class="register-form-title">
            <img
              src="../assets/images/login/logo.png"
              style="width: 139px; height: 42px"
              alt=""
            />
          </div>

          <el-form-item label="用户名" prop="username" required>
            <el-input v-model="form.username" type="text"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" required>
            <el-input
              v-model="form.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword" required>
            <el-input
              v-model="form.newPassword"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="email" prop="email" type="text" required>
            <div class="email">
              <el-input v-model="form.email"></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="code"
            type="text"
            required
            class="code"
          >
            <el-input v-model="form.code"></el-input>
            <el-button
              class="email-btn"
              size="medium"
              type="primary"
              @click="getCode()"
            >
              <span>发送验证码</span>
            </el-button>
          </el-form-item>

          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="register-btn"
              size="medium"
              type="primary"
              style="width: 100%"
              @click="signup()"
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
import { getCodeApi, signupApi } from "@/api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        code: "",
        newPassword: "",
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
      const validateEmail = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入邮箱"));
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
      const validateCode = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入验证码"));
        } else {
          callback();
        }
      };
      const validateNewPassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        username: [{ validator: validateUsername, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        newPassword: [{ validator: validateNewPassword, trigger: "blur" }],
      };
    },
  },
  methods: {
    async getCode() {
      if (this.form.email !== "") {
        let res = await getCodeApi({ email: this.form.email });
        // console.log("res", res);
      } else {
        this.$message.error("请输入邮箱！");
      }
    },
    async signup() {
      try {
        let res = await signupApi(this.form);
        if (res.code == 200) {
          this.$router.push({ path: "/login" });
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang="less">
.body {
  min-width: 1366px;
}
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #333;
}
.register-box {
  width: 1000px;
  height: 474.38px;
  border-radius: 8px;
  display: flex;
}

.register-box img {
  width: 60%;
  height: auto;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.register-form {
  background: #ffffff;
  width: 40%;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-form .el-form-item[data-v-63ae9146] {
  margin-bottom: 20px;
}
.register-form .el-form {
  width: 294px;
  height: 330px;
  margin-top: -120px;
}

.register-form .el-form-item {
  margin-bottom: 30px;
}
/* .register-form .email {
  background-color: pink;
  display: flex;
} */
.register-form .email .email-btn {
  width: 120px;
  text-align: center;
  font-size: 14px;
  /* padding: 10px; */
}
.register-form .el-form-item.is-error .el-input__inner {
  border: 0 !important;
  border-bottom: 1px solid #fd7065 !important;
  background: #fff !important;
}
.register-form .input-icon {
  height: 32px;
  width: 18px;
  margin-left: -2px;
}
.register-form .el-input__inner {
  border: 0;
  border-bottom: 1px solid #e9e9e8;
  border-radius: 0;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  height: 32px;
  line-height: 32px;
}
.register-form .el-input__prefix {
  left: 0;
}
.register-form .el-input--prefix .el-input__inner {
  padding-left: 26px;
}
.register-form .el-input__inner::placeholder {
  color: #aeb5c4;
}
.register-form .el-form-item--medium .el-form-item__content {
  line-height: 32px;
}
.register-form .el-input--medium .el-input__icon {
  line-height: 32px;
}
.register-btn {
  border-radius: 17px;
  padding: 11px 20px !important;
  margin-top: 10px;
  margin-left: -30px;
  font-size: 14px;
  border: 0;
  background-color: #ffc200;
}

.register-btn {
  border-radius: 17px;
  border: 0;
  margin-top: -20px;
}
.register-form-title {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.register-form-title .title-label {
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  margin-left: 10px;
}
.code {
  /deep/.el-form-item__content {
    display: flex;
  }
  /deep/.el-button {
    padding: 10px;
  }
}
</style>
