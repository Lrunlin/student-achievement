<template>
  <el-card class="mb-4">
    <span class="mr-4">修改当前学期:</span>
    <el-input-number v-model="semester" :min="1" :max="12" @change="handleChange" />
  </el-card>
  <el-card>
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton :rows="5" />
      <el-skeleton :rows="5" />
    </div>
    <el-descriptions title="数据分析" direction="vertical" :column="4" border>
      <el-descriptions-item label="学生数量">
        <count-up
          v-if="!isLoading && data?.data"
          :end-val="data?.data?.systemStats.student_count"
        ></count-up>
      </el-descriptions-item>
      <el-descriptions-item label="学院数量">
        <count-up
          v-if="!isLoading && data?.data"
          :end-val="data?.data?.systemStats.college_count"
        ></count-up
      ></el-descriptions-item>
      <el-descriptions-item label="教师数量">
        <count-up
          v-if="!isLoading && data?.data"
          :end-val="data?.data?.systemStats.teacher_count"
        ></count-up
      ></el-descriptions-item>
      <el-descriptions-item label="专业数量">
        <count-up
          v-if="!isLoading && data?.data"
          :end-val="data?.data?.systemStats.major_count"
        ></count-up
      ></el-descriptions-item>
      <el-descriptions-item label="学生数量">
        <div id="orderDate" style="width: 100%; height: 400px"></div
      ></el-descriptions-item>
    </el-descriptions>
  </el-card>
  <About />
</template>
<script setup>
import { ref, watchEffect, onMounted } from "vue";
import moment from "moment";
// import * as echarts from "echarts";
import * as echarts from "echarts/core";
import axios from "axios";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import useFetch from "@/hooks/useFetch";
import CountUp from "vue-countup-v3";
import { ElMessage } from "element-plus";
import About from "@/components/About.vue";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
let { data, isLoading } = useFetch(() => axios.get("/system/details"));
watchEffect(() => {
  if (!isLoading.value && data?.value?.data?.studentCountChange) {
    let list = data?.value?.data?.studentCountChange;
    let myChart = echarts.init(document.getElementById("orderDate"));
    let option = {
      xAxis: {
        type: "category",
        data: list.map(item => moment(item.date).format("YYYY-MM-DD")),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: list.map(item => item.count),
          type: "line",
          smooth: true,
        },
      ],
    };
    option && myChart.setOption(option);
  }
});

let semester = ref(1);
axios.get("/semester").then(res => {
  semester.value = res.data.currentSemester;
});

function handleChange(value) {
  axios.put("/semester", { semester: value }).then(res => {
    if (!res.data.success) {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang="scss"></style>
<route lang="json"></route>
