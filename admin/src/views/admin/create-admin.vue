<template>
  <div class="container">
    <el-input class="input" v-model="id" placeholder="管理员账号" />
    <el-input class="input" type="password" v-model="password" placeholder="管理员密码" />
    <el-button class="input" :disabled="!disabled" type="primary" @click="create">添加</el-button>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
let id = ref("");
let password = ref("");
function create() {
  axios
    .post(`/api`, {
      sql: `INSERT INTO admin ( id, password ) VALUES ("${id.value}", "${password.value}");`,
    })
    .then(res => {
      let result = res.data.res;
      if (result) {
        ElMessage.success("添加成功");
        id.value = "";
        password.value = "";
      } else {
        ElMessage.error("添加失败");
      }
    })
    .catch(err => {
      ElMessage.error("添加失败");
    });
}
const disabled = computed(
  () => /^[\s\S]*.*[^\s][\s\S]*$/.test(id.value) && /^[\s\S]*.*[^\s][\s\S]*$/.test(password.value)
);
</script>
<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-direction: column;

  .input {
    width: 400px;
    margin-top: 20px;
  }
}
</style>
