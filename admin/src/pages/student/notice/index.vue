<template>
  <el-card>
    <Notice />
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import Notice from "@/components/Notice.vue";

let router = useRouter();
</script>
<style scoped lang="scss"></style>
