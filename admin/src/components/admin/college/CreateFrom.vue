<template>
  <el-form class="max-w-3xl" :model="form" label-width="120px" ref="formRef" :rules="formRules">
    <el-form-item label="学院名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="">
      <el-button @click="submitForm" block type="primary" class="w-60 mt-4">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from "vue";
import Upload from "@/components/Upload.vue";
import { watchEffect } from "vue";
let formRef = ref();
let form = ref({ name: "" });

const formRules = {
  name: [{ required: true, message: "请输入学院名称", trigger: "blur" }],
};

const emit = defineEmits(["onSubmit"]);
// 设置初始值
const props = defineProps(["initValue"]);
watchEffect(() => {
  if (props.initValue) {
    form.value = props.initValue;
  }
});

const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {
      emit("onSubmit", form.value);
    }
  });
};
</script>
<style scoped lang="scss"></style>
