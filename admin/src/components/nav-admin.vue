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
            <el-icon><UserFilled /></el-icon>
            <span>教师管理</span>
          </template>
          <el-menu-item index="/create-teacher">
            <template #title>添加教师</template>
          </el-menu-item>
          <el-menu-item index="/read-teacher">
            <template #title>查看教师</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><User /></el-icon>
            <span>学生管理</span>
          </template>
          <el-menu-item index="/create-student">
            <template #title>添加学生</template>
          </el-menu-item>
          <el-menu-item index="/read-student">
            <template #title>查看学生</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/admin-chengji">
          <el-icon><Notebook /></el-icon>
          <template #title>成绩管理</template>
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Comment /></el-icon>
            <span>公告</span>
          </template>
          <el-menu-item index="/create-message">
            <el-icon><MessageBox /></el-icon>
            <template #title>发布公告</template>
          </el-menu-item>
          <el-menu-item index="/admin-message">
            <el-icon><Edit /></el-icon>
            <template #title>管理公告</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/settime">
          <el-icon><Timer /></el-icon>
          <template #title>时间设置</template>
        </el-menu-item>
        <el-menu-item index="/updata-admin">
          <el-icon><Menu /></el-icon>
          <template #title>修改信息</template>
        </el-menu-item>
        <el-menu-item index="/read-apply">
          <el-icon><Message /></el-icon>
          <template #title>查看申请 </template>
        </el-menu-item>
        <el-menu-item index="/create-admin">
          <el-icon><Avatar /></el-icon>
          <template #title>添加管理员</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  UserFilled,
  User,
  Notebook,
  Comment,
  MessageBox,
  Edit,
  Timer,
  Menu,
  Message,
  Avatar,
} from "@element-plus/icons-vue";
let router = useRouter();
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
