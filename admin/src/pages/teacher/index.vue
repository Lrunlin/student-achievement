<template>
  <el-card>
    <el-descriptions size="default" v-if="data?.data" title="基本信息" :column="1" border>
      <el-descriptions-item label="姓名">{{ data.data.teacher.name }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ data.data.teacher.age }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ data.data.teacher.sex }}</el-descriptions-item>
      <el-descriptions-item label="学院">
        <el-tag type="primary">{{ data.data.teacher.college_name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item
        :label="`授课:${item.course_name}(${item.course_semester})`"
        v-for="(item, index) in data.data.course_data"
        :key="index"
      >
        <el-tag
          :class="index && 'ml-2'"
          type="primary"
          v-for="(item, index) in item.class_data"
          :key="index"
        >
          {{ item.major_name }}({{ item.class_index }})班
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <About />
</template>
<script setup>
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import About from "@/components/About.vue";

let { data, isLoading, refetch } = useFetch(() => axios.get(`/teacher-info`));
</script>
<style scoped lang="scss"></style>
