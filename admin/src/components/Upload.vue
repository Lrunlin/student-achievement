<template>
  <el-upload
    class="avatar-uploader"
    :action="url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    name="image"
    accept="image/*"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { Plus } from "@element-plus/icons-vue";
import { watchEffect } from "vue";
let url = axios.defaults.baseURL + "/static";
let emit = defineEmits(["onSubmit"]);
let imageUrl = ref(false);
let props = defineProps(["initValue"]);
// 设置初始值
watchEffect(() => {
  if (props.initValue) {
    imageUrl.value = axios.defaults.baseURL + "/" + props.initValue;
  }
});

function handleAvatarSuccess(params) {
  imageUrl.value = axios.defaults.baseURL + "/" + params.data;
  emit("onSubmit", params.data);
}
</script>
<style scoped lang="scss"></style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
