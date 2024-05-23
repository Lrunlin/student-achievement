<template>
  <el-form label-width="80px">
    <el-form-item label="教师工号">
      <el-input type="text" v-model="id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="text" v-model="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="教师姓名">
      <el-input
        type="text"
        v-model="name"
        placeholder="填写教师姓名"
      ></el-input>
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input
        type="text"
        v-model="tel"
        placeholder="填写教师电话"
        maxlength="11"
      ></el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="sex" placeholder="请选择" :disabled="isTeacher">
        <el-option
          v-for="item in sexs"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="任课">
      <el-select v-model="subject" placeholder="请选择" :disabled="isTeacher">
        <el-option
          v-for="item in subjects"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" :icon="Check" @click="create"
      >确认修改</el-button
    >
  </el-form>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import api from "@/modules/api";
import readUser from "@/modules/common/read-user";
import {Check} from '@element-plus/icons-vue'
let route = useRoute();

let isTeacher = ref(localStorage.id == "teacher");

let id = ref("");
let name = ref("");
let tel = ref("");
let sex = ref("男");
let password = ref("");
let sexs = ref([
  {
    label: "男",
  },
  {
    label: "女",
  },
]);
let subject = ref("创新与实践");
let subjects = ref([
  {
    label: "创新与实践",
  },
  {
    label: "马克思主义思想",
  },
  {
    label: "高等数学",
  },
  {
    label: "VUE.js",
  },
  {
    label: "Node.js",
  },
  {
    label: "MySQL数据库",
  },
]);

readUser({
  col: "teacher",
  id: route.query.id,
}).then((res) => {
  let data = res.res[0];
  name.value = data.name;
  id.value = data.id;
  tel.value = data.tel;
  sex.value = data.sex;
  subject.value = data.subject;
  password.value = data.password;
});

function create() {
  let telTest = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  let nullTest = /^[\s\S]*.*[^\s][\s\S]*$/;
  let isCreate =
    nullTest.test(name.value) &&
    nullTest.test(tel.value) &&
    telTest.test(tel.value);
  if (isCreate) {
    api(
      ` UPDATE teacher SET name='${name.value}',tel='${tel.value}',sex='${sex.value}',subject='${subject.value}',password='${password.value}' WHERE id='${id.value}';`
    ).then((res) => {
      if (res.res) {
        ElMessage({
          message: `修改成功`,
          type: "success",
        });
      } else {
        ElMessage({
          message: `修改失败`,
          type: "error",
        });
      }
    });
  } else {
    ElMessage.warning({
      message: "请按照正确格式填写全部内容",
      type: "warning",
    });
  }
}
</script>
<style scoped lang='scss'>
.el-form-item {
  width: 400px;
  margin: 0px auto;
  margin-top: 30px;
}
.el-button {
  width: 400px;
  margin: 0px auto;
  margin-top: 30px;
  display: block;
}
.el-select {
  margin-top: 0px !important;
  margin-left: 0px !important;
}
</style>