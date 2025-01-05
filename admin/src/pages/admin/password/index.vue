<template>
  <el-card>
    <el-form :model="form" ref="passwordFormRef" :rules="passwordRules" label-width="120px">
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          autocomplete="new-password"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          autocomplete="new-password"
          placeholder="请确认新密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" block class="!w-60">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

const form = ref({
  password: "",
  confirmPassword: "",
});

const passwordFormRef = ref(null);
const passwordRules = {
  password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 16, message: "密码长度应为6-16位", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9]+$/, message: "密码只能包含字母和数字", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (form.value.password != form.value.confirmPassword) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
const submit = () => {
  passwordFormRef.value.validate(valid => {
    if (valid) {
      axios.put("/admin-password", { password: form.value.password }).then(res => {
        if (res.data.success) {
          ElMessage({
            message: res.data.message,
            type: "success",
          });
        } else {
          ElMessage({
            message: res.data.message,
            type: "error",
          });
        }
      });
    }
  });
};
</script>
