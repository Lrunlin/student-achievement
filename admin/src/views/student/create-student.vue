<template>
  <el-form label-width="80px">
    <el-form-item label="学生姓名">
      <el-input
        type="text"
        v-model="name"
        placeholder="填写学生姓名"
      ></el-input>
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input
        type="text"
        v-model="tel"
        placeholder="填写学生电话"
        maxlength="11"
      ></el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="sex" placeholder="请选择">
        <el-option
          v-for="item in sexs"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="班级">
      <el-select v-model="stuClass" placeholder="请选择">
        <el-option
          v-for="item in setClass"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" icon="el-icon-check" @click="create"
      >添加学生</el-button
    >
  </el-form>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import createStudent from "@/modules/student/create-student";
let name = ref("");
let tel = ref("");
let sex = ref("男");
let sexs = ref([
  {
    label: "男",
  },
  {
    label: "女",
  },
]);
let stuClass = ref("软件工程1班");
let setClass = ref([
  {
    label: "软件工程1班",
  },
  {
    label: "软件工程2班",
  },
  {
    label: "软件工程3班",
  },
  {
    label: "软件工程4班",
  },
  {
    label: "软件工程5班",
  },
  {
    label: "软件工程6班",
  },
]);
// 将成绩表和学生绑定
function create() {
  let telTest = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  let nullTest = /^[\s\S]*.*[^\s][\s\S]*$/;
  let isCreate =
    nullTest.test(name.value) &&
    nullTest.test(tel.value) &&
    telTest.test(tel.value);
  let id = "s" + new Date().getTime();
  if (isCreate) {
    createStudent({
      name: name.value,
      sex: sex.value,
      class: stuClass.value,
      tel: tel.value,
    }).then((res) => {
      ElMessage({
        message: `成功添加学生:${name.value},学号：${res.id}`,
        type: "success",
      });
      name.value = "";
      tel.value = "";
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
  margin-left: 0px  !important;;
}
</style>