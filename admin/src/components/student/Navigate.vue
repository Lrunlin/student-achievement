<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="w-52 min-h-screen"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-menu-item index="/student"
      ><el-icon><HomeFilled /></el-icon>首页</el-menu-item
    >
    <el-menu-item index="/student/notice">
      <el-icon><ChatLineSquare /></el-icon>通知列表</el-menu-item
    >
    <el-menu-item index="/student/password"
      ><el-icon><Setting /></el-icon>密码修改</el-menu-item
    >
    <el-menu-item index="/student/about"
      ><el-icon><Star /></el-icon>关于</el-menu-item
    >
    <el-menu-item index="/sign"
      ><el-icon><Fold /></el-icon>退出登录</el-menu-item
    >
  </el-menu>
</template>
<script setup>
import { ref } from "vue";

import { Setting, Fold, HomeFilled, ChatLineSquare, Star } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
