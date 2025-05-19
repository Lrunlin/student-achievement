<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <!-- 登录表单区域 -->
      <el-form label-width="0px" class="login_form" ref="form">
        <el-form-item>
          <el-select v-model="auth" placeholder="身份选择" class="w-full">
            <el-option label="学生" value="student" />
            <el-option label="教师" value="teacher" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item>
          <el-input placeholder="账号" v-model="username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input placeholder="密码" v-model="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row justify="end">
          <el-form-item class="login_btn">
            <el-button type="primary" @click="submit">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserData } from "@/store/useUserData";
import { ElMessage, ElNotification } from "element-plus";
import cookie from "js-cookie";

let useUser = useUserData();
let router = useRouter();
let form = ref(null);
let username = ref("");
let password = ref("");
let auth = ref(localStorage.stu_score_auth || "student");

function reset() {
  username.value = "";
  password.value = "";
}

if (import.meta.env.MODE == "development") {
  ElNotification({
    title: "运行提示",
    dangerouslyUseHTMLString: true,
    message:
      "因为每个人技术水平不同 同时电脑开发环境不同<br/>如果出现启动或者运行错误的情况可以查看README.md联系开发者<br/>微信:webzhizuo  QQ:1974109227",
    type: "warning",
    duration: 0,
  });
}

function submit() {
  if (
    /^[\s\S]*.*[^\s][\s\S]*$/.test(username.value) &&
    /^[\s\S]*.*[^\s][\s\S]*$/.test(password.value)
  ) {
    axios
      .post("/sign/" + auth.value, { username: username.value, password: password.value })
      .then(res => {
        if (res.data.success) {
          ElMessage.success("登录成功");
          localStorage.stu_score_auth = auth.value;
          cookie.set(localStorage.stu_score_auth + "_token", res.data.token);
          useUser.set(res.data.data);
          router.replace("/" + auth.value);
        } else {
          ElMessage.error("登录失败");
        }
      })
      .catch(err => {
        ElMessage.error("登录失败");
      });
  } else {
    ElMessage.warning("请填写账号或密码");
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_btn {
  display: flex;
  justify-content: flex-end;
}
</style>
