<template>
  <el-form label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="title" clearable></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" :rows="8" v-model="text" clearable></el-input>
    </el-form-item>
  </el-form>
  <el-button class="create-message" type="primary" @click="create"
    >发布</el-button
  >
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
import { ElMessage } from "element-plus";
let title = ref("");
let text = ref("");
function create() {
  api(`INSERT INTO message ( id, title,text,time )
                       VALUES
       ( '${new Date().getTime()}', '${title.value}','${
    text.value
  }' ,NOW());`).then((res) => {
    if (res.res) {
      ElMessage.success({
        message: "成功发布通告",
        type: "success",
      });
      title.value = "";
      text.value = "";
    } else {
      ElMessage({
        message: "发布失败",
        type: "error",
      });
    }
  });
}
</script>
<style scoped lang='scss'>
.el-form-item {
  width: 500px;
  margin: 0px auto;
  margin-top: 20px;
}
.create-message {
  width: 500px;
  display: block;
  margin: 0px auto;
  margin-top: 30px;
}
</style>