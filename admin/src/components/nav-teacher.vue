<template>
  <el-row>
    <el-col>
      <el-menu
        :router="true"
        default-active="/create-teacher"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item> 图标 </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>学生管理</span>
          </template>
          <!-- <el-menu-item index="/create-student">
            <template #title>添加学生</template>
          </el-menu-item> -->
          <el-menu-item index="/read-student">
            <template #title>查看学生</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><EditPen /></el-icon>
            <span>成绩管理</span>
          </template>
          <el-menu-item index="/teacher-chengji">
            <template #title>成绩录入</template>
          </el-menu-item>
          <el-menu-item index="/teacher-excel">
            <template #title>表格上传</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/read-message">
          <el-icon><MessageBox /></el-icon>
          <template #title>查看公告</template>
        </el-menu-item>
        <el-menu-item :index="updataTeacherUrl">
          <el-icon><Edit /></el-icon>
          <template #title>修改信息</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
import { User, EditPen, MessageBox, Edit } from "@element-plus/icons-vue";

let updataTeacherUrl = "/updata-teacher?id=" + localStorage.teacher;
</script>
<style scoped lang="scss">
.el-row {
  user-select: none;
  width: 200px;
  height: 100vh;
  background: #545c64;
  position: fixed;
  top: 0px;
  left: 0px;
}
.el-menu {
  border: 0px;
}
</style>
