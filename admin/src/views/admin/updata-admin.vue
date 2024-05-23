<template>
  <el-form label-width="120px">
    <el-form-item label="管理员账号">
      <el-input v-model="user" clearable placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="管理员密码">
      <el-input v-model="password" clearable placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" class="" plain @click="updata">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/modules/api";
import readStudent from "@/modules/common/read-user";
let router = useRouter();
let user = ref("");
let password = ref("");
let test = /^[\s\S]*.*[^\s][\s\S]*$/;

readStudent({ col: "admin", id: localStorage.admin }).then(res => {
  user.value = res.res[0].id;
  password.value = res.res[0].password;
});

function updata() {
  let isUpdata = test.test(user.value) && test.test(password.value);
  api(
    `UPDATE admin SET id='${user.value}', password='${password.value}' where id='${localStorage.admin}';`
  ).then(res => {
    localStorage.clear();
    router.replace("/logn");
  });
}
</script>
<style scoped lang="scss">
.el-form-item {
  width: 400px !important;
  display: flex;
  margin: 0px auto;
  margin-top: 30px;
}
.el-button {
  width: 300px;
  display: block;
}
</style>
