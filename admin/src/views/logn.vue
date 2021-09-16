<template>
  <div class="box">
    <el-input
      placeholder="请输入账号"
      v-model="user"
      clearable
      prefix-icon="el-icon-user"
    >
    </el-input>
    <el-input
      placeholder="请输入密码"
      v-model="password"
      show-password
      clearable
      prefix-icon="el-icon-key"
      style="margin-top: 20px"
    ></el-input>
    <el-select v-model="id" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-s-promotion" @click="logn"
      >登录</el-button
    >
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import lognFun from "@/modules/logn";
let router = useRouter();
onMounted(() => {
  console.log(document.body);
  // document.body.classList.add("logn");
});
onUnmounted(() => {
  document.body.classList.remove("logn");
});
//账号密码身份
let user = ref("");
let password = ref("");
let id = ref("student");
function logn() {
  if (user.value == "" || password.value == "") {
    ElMessage({
      message: "请将信息填写完整",
      type: "error",
    });
  } else {
    lognFun({
      col: id.value,
      id: user.value,
      password: password.value,
    }).then((res) => {
      if (res.res == false) {
        ElMessage({
          message: "账号或密码错误",
          type: "error",
        });
      } else {
        localStorage.id = res.id; //身份
        localStorage.user = res.user; //账号
        localStorage[res.id] = user.value;
        let go =
          res.id == "admin"
            ? "create-teacher"
            : res.id == "teacher"
            ? "read-student"
            : "student-score";
        router.replace({ path: `/${go}`, query: { user: user.value } });
      }
    });
  }
}
let options = ref([
  {
    label: "学生",
    value: "student",
  },
  {
    label: "教师",
    value: "teacher",
  },
  {
    label: "管理员",
    value: "admin",
  },
]);
</script>
<style scoped lang='scss'>
.box {
  text-align: center;
  width: 400px;
  height: 280px;
  background-color: white;
  margin: 0px auto;
  top: calc((100vh - 310px) / 2);
  position: relative;
  border-radius: 10px;
  padding-top: 30px;
}
.el-input {
  width: 300px;
  display: block;
  margin: 0px auto;
}

.el-select {
  width: 300px;
  margin-top: 30px;
  margin-left: 0px !important;
}
.el-button {
  width: 300px;
  margin-top: 30px;
}
</style>