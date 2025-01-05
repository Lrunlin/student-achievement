<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="w-52 min-h-screen"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-menu-item index="/admin"
      ><el-icon><HomeFilled /></el-icon>首页</el-menu-item
    >
    <el-sub-menu index="2">
      <template #title>
        <el-icon><School /></el-icon>
        学校管理
      </template>
      <el-menu-item index="/admin/college">学院管理</el-menu-item>
      <el-menu-item index="/admin/major">专业管理</el-menu-item>
      <el-menu-item index="/admin/class">班级管理</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/course">
      <el-icon><Calendar /></el-icon>课程列表</el-menu-item
    >
    <el-menu-item index="/admin/student"
      ><el-icon><UserFilled /></el-icon>学生管理</el-menu-item
    >
    <el-menu-item index="/admin/teacher"
      ><el-icon><Avatar /></el-icon>教师列表</el-menu-item
    >
    <el-sub-menu index="3">
      <template #title>
        <el-icon><ChatLineSquare /></el-icon>
        通知管理
      </template>
      <el-menu-item index="/admin/notice/create">发布通知</el-menu-item>
      <el-menu-item index="/admin/notice">通知列表</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/about"
      ><el-icon><Star /></el-icon>关于</el-menu-item
    >
    <el-menu-item index="/admin/password"
      ><el-icon><Setting /></el-icon>密码修改</el-menu-item
    >
    <el-menu-item index="/sign"
      ><el-icon><Fold /></el-icon>退出登录</el-menu-item
    >
  </el-menu>
</template>
<script setup>
import { ref } from "vue";
import {
  Calendar,
  Printer,
  Setting,
  Fold,
  Avatar,
  UserFilled,
  HomeFilled,
  School,
  ChatLineSquare,
  Star,
} from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
