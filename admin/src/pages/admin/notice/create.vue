<template>
  <el-card>
    <Notice :key="key" @submit="submit" />
  </el-card>
</template>
<script setup>
import { ref, computed } from "vue";
import Notice from "@/components/admin/CreateNotice/index.vue";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { ElMessage } from "element-plus";

let key = ref(+new Date());
function submit(values) {
  axios.post("/notice", values).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      key.value = +new Date();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang="scss"></style>
