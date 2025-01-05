<template>
  <!-- 内容部分 -->
  <el-card class="mt-4">
    <!-- 搜索部分 -->
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data">
      <el-descriptions title="成绩单" :column="4" size="default" border>
        <templata v-for="(item, index) in data?.data" :key="index">
          <el-descriptions-item label="课程">{{ item.course_name }}</el-descriptions-item>
          <el-descriptions-item label="成绩">
            <div v-if="item.student_score">
              {{ item.student_score }}/{{ item.course_total_score }}
            </div>
            <div v-else>暂未录入</div>
          </el-descriptions-item>
          <el-descriptions-item label="学分">{{
            computedScore(item.student_score, item.course_total_score, item.course_credit)
          }}</el-descriptions-item>
          <el-descriptions-item label="授课教师">{{
            item.teacher_name || "无授课教师"
          }}</el-descriptions-item>
        </templata>
      </el-descriptions>
    </div>
  </el-card>
  <About />
</template>
<script setup>
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { useRouter } from "vue-router";
import About from "@/components/About.vue";

let router = useRouter();

let class_id = ref(null);
// 查询列表
let { data, isLoading, refetch } = useFetch(() => axios.get(`/student-score`), {
  // callback: data => {
  //   if (!class_id.value) {
  //     class_id.value = data.data[0]?.major_data[0]?.class_data[0]?.class_id;
  //   }
  // },
});

function computedScore(score, total_score, credit) {
  return ((score / total_score) * credit).toFixed(2);
}
</script>
<style scoped lang="scss"></style>
