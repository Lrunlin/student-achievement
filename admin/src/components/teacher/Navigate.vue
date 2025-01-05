<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="w-52 min-h-screen"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-menu-item index="/teacher"
      ><el-icon><HomeFilled /></el-icon>首页</el-menu-item
    >
    <el-menu-item index="/teacher/score">
      <el-icon><Calendar /></el-icon>成绩录入</el-menu-item
    >
    <el-menu-item index="/teacher/notice"
      ><el-icon><ChatLineSquare /></el-icon>通知列表</el-menu-item
    >
    <el-menu-item index="/teacher/password"
      ><el-icon><Setting /></el-icon>密码修改</el-menu-item
    >
    <el-menu-item index="/teacher/about"><el-icon><Star /></el-icon>关于</el-menu-item>
    <el-menu-item index="/sign"
      ><el-icon><Fold /></el-icon>退出登录</el-menu-item
    >
  </el-menu>
</template>
<script setup>
import { ref } from "vue";
import { Calendar, Setting, Fold, HomeFilled, ChatLineSquare,Star } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
