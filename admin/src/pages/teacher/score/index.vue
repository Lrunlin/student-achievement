<template>
  <!-- 内容部分 -->
  <el-card class="mt-4">
    <!-- 搜索部分 -->
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data">
      <el-tabs type="border-card">
        <el-tab-pane
          :key="major.major_id"
          v-for="(major, index) in data.data"
          :label="major.major_name"
        >
          <el-tabs type="border-card">
            <el-tab-pane
              :key="course.course_id"
              v-for="(course, index) in major.course_data"
              :label="course.course_name"
            >
              <el-tabs type="border-card">
                <el-tab-pane
                  :key="index"
                  v-for="(classData, index) in course.class_data"
                  :label="`${major.major_name} (${classData.class_index})班`"
                >
                  <el-button @click="xlsxCourseClass(course.course_id, classData.class_id)"
                    >下载成绩</el-button
                  >
                  <el-button
                    @click="
                      scoreChart(
                        major.major_name,
                        course.course_name,
                        classData.class_index,
                        classData?.student_data,
                        course.course_total_score
                      )
                    "
                    >成绩分析</el-button
                  >
                  <!-- 内容表格 -->
                  <el-table class="!w-full" :data="classData?.student_data" style="width: 100%">
                    <el-table-column label="学号" width="180">
                      <template v-slot="scope">
                        <div class="truncate">{{ scope.row.student_id }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="160">
                      <template v-slot="scope">
                        <div class="truncate">{{ scope.row.student_name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="性别" width="80">
                      <template v-slot="scope">
                        <div class="truncate">{{ scope.row.student_sex }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="成绩">
                      <template v-slot="scope">
                        <el-input-number
                          @change="val => changeScore(scope.row.student_id, course.course_id, val)"
                          v-model="scope.row.student_score"
                          style="width: 240px"
                          placeholder="该课成绩"
                          :min="0"
                          :max="course.course_total_score"
                        />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>

  <el-dialog v-model="dialogVisible" title="成绩分析" width="600" @open="open">
    <div id="main" style="width: 400px; height: 560px; margin: 0px auto"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { useRouter } from "vue-router";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { ElMessage } from "element-plus";

let router = useRouter();

let class_id = ref(null);
// 查询列表
let { data, isLoading, refetch } = useFetch(() => axios.get(`/teacher-tree`));
//修改成绩
function changeScore(student_id, course_id, score) {
  axios.put("/score", { student_id, course_id, score }).then(res => {
    if (!res.data.success) {
      ElMessage.error(res.data.message);
    }
  });
}
//下载 专业-班级
function xlsxCourseClass(course_id, class_id) {
  axios.get("/generate-grade-sheet", { params: { course_id, class_id } }).then(res => {
    if (res.data.success) {
      let a = document.createElement("a");
      a.href = `${axios.defaults.baseURL}${res.data.filePath}`;
      a.target = "_blank";
      a.download = true;

      a.click();
      a.remove();
    } else {
      ElMessage.error(res.data.message);
    }
    let a = document.createElement("a");
  });
}

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

let charOption = {};
let dialogVisible = ref(false);
function open() {
  let chartDom = document.getElementById("main");

  let myChart = echarts.init(chartDom);
  let option;

  let score = [0, 0, 0];
  charOption.student_data.forEach(item => {
    if (item.student_score > charOption.total * 0.6) {
      score[2]++;
    } else if (
      item.student_score > charOption.total * 0.6 &&
      item.student_score < charOption.total * 0.9
    ) {
      score[1]++;
    } else {
      score[0]++;
    }
  });

  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: `${charOption.major_name}(${charOption.class_index})班 ${charOption.course_name}成绩`,
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: ["不及格", "良好", "优秀"].map((item, index) => ({
          value: score[index],
          name: item,
        })),
      },
    ],
  };

  option && myChart.setOption(option);
}
function scoreChart(major_name, course_name, class_index, student_data, total) {
  charOption.major_name = major_name;
  charOption.course_name = course_name;
  charOption.class_index = class_index;
  charOption.student_data = student_data;
  charOption.total = total;
  dialogVisible.value = true;
}
</script>
<style scoped lang="scss"></style>
