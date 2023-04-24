<template>
  <el-row>
    <el-col>
      <el-menu :router="true" default-active="/create-teacher" class="el-menu-vertical-demo" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item> 图标 </el-menu-item>
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-user-solid"></i>
            <span>教师管理</span>
          </template>
          <el-menu-item index="/create-teacher">
            <template #title>添加教师</template>
          </el-menu-item>
          <el-menu-item index="/read-teacher">
            <template #title>查看教师</template>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-user"></i>
            <span>学生管理</span>
          </template>
          <el-menu-item index="/create-student">
            <template #title>添加学生</template>
          </el-menu-item>
          <el-menu-item index="/read-student">
            <template #title>查看学生</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin-chengji">
          <i class="el-icon-s-order"></i>
          <template #title>成绩管理</template>
        </el-menu-item>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-s-comment"></i>
            <span>通告</span>
          </template>
          <el-menu-item index="/create-message">
            <i class="el-icon-chat-dot-square"></i>
            <template #title>发布通告</template>
          </el-menu-item>
          <el-menu-item index="/admin-message">
            <i class="el-icon-edit"></i>
            <template #title>管理公告</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/settime">
          <i class="el-icon-timer"></i>
          <template #title>时间设置</template>
        </el-menu-item>
        <el-menu-item index="/updata-admin">
          <i class="el-icon-menu"></i>
          <template #title>修改信息</template>
        </el-menu-item>
        <el-menu-item index="/read-apply">
          <i class="el-icon-menu"></i>
          <template #title>查看申请 </template>
        </el-menu-item>
        <el-menu-item index="/create-admin">
          <i class="el-icon-user-solid"></i>
          <template #title>添加管理员</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
</script>
<style scoped lang='scss'>
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