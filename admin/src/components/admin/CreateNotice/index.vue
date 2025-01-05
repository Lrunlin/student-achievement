<template>
  <el-form ref="formRef" :model="form" :rules="formRules" label-width="120px" style="width: 800px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="是否置顶" prop="isTop">
      <el-checkbox v-model="form.isTop" />
    </el-form-item>
    <el-form-item label="接收方" prop="target">
      <el-select
        v-model="form.target"
        clearable
        placeholder="选择身份(默认全部)"
        style="width: 240px"
      >
        <el-option class="h-40" value="teacher" label="教师"> </el-option>
        <el-option class="h-40" value="student" label="学生"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="专业" prop="major_id">
      <el-select
        v-model="form.major_id"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="选择专业(默认全部)"
        :remote-method="val => (keyword = val)"
        style="width: 240px"
      >
        <el-option
          v-if="majorData"
          class="h-40"
          v-for="item in majorData?.data?.list"
          :key="item.major_id"
          :value="item.major_id"
          :label="item.major_name"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <Edit :key="key" @onSubmit="val => (form.content = val)" />
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submit">发布</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from "vue";
import Edit from "./Edit.vue";
import useFetch from "@/hooks/useFetch";
import axios from "axios";

let { data: majorData } = useFetch(() => axios.get(`/major`));

let emit = defineEmits(["submit"]);

let formRef = ref(null);

let form = ref({
  title: "",
  content: "",
  major_id: [],
  target: "",
  isTop: false,
});
const formRules = {
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { max: 255, message: "标题不能超过255个字符", trigger: "blur" },
  ],
  content: [
    { required: true, message: "请输入内容", trigger: "blur" },
    { max: 1000, message: "内容不能超过1000个字符", trigger: "blur" },
  ],
  isTop: [{ required: true, message: "请选择", trigger: "blur" }],
};

let key = ref(+new Date());

function submit() {
  formRef.value.validate(valid => {
    if (valid) {
      emit("submit", form.value);
    }
  });
}
</script>
<style scoped lang="scss"></style>
