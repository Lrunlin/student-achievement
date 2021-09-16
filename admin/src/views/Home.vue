<template>
  <component :is="nav"></component>
  <div class="title">
    {{ title }}
    <div class="back" title="点击退出系统" @click="back">
      <i class="el-icon-back"></i>
      退出系统
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import admin from "@/components/nav-admin";
import teacher from "@/components/nav-teacher";
import student from "@/components/nav-student";

import { useRouter } from "vue-router";

let nav =
  localStorage.id == "admin"
    ? admin
    : localStorage.id == "teacher"
    ? teacher
    : student;
let router = useRouter();
let title =
  localStorage.id == "admin"
    ? "管理员"
    : localStorage.id == "student"
    ? "学生"
    : "教师";
let name = localStorage.user;
if (name == undefined) {
  router.replace("/logn");
}
document.body.style.paddingLeft = "200px";

onUnmounted(() => {
  document.body.style.paddingLeft = "0px";
  document.body.classList.add("logn");
});
function back() {
  localStorage.clear();
  router.replace("logn");
}
</script>
<style scoped>
.title {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #545c64;
  color: white;
}
.back {
  float: right;
  font-size: 14px;
  margin-right: 20px;
  color: white;
}
</style>
