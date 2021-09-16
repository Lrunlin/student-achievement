<template>
  <h2 v-if="student.length">
    {{ studentName }} 同学：你有{{
      student.length
    }}课成绩不及格，请及时联系老师补考
  </h2>
  <div
    class="mes-box"
    v-for="(item, index) in student"
    :key="index"
    v-if="isStudent"
    v-show="isWatch == 'true'"
  >
    <div class="mes-title">关于{{ item.key }}考试不及格</div>
    <div class="mes-text">
      {{ studentName }}同学：
      <p>你的{{ item.key }}成绩为{{ item.value }}分。请联系老师补考</p>
    </div>
  </div>
  <div class="mes-box" v-for="(item, index) in tableData" :key="index">
    <div class="mes-title">{{ item.title }}</div>
    <div class="mes-text">{{ item.text }}</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
let tableData = ref("");
let student = ref([]);
let isStudent = ref(localStorage.id == "student");
let studentName = ref(localStorage.student);
let isWatch = ref("");
api(`select * from isshow`).then((res) => {
  isWatch.value = res.res[0].watch;
});
if (localStorage.id == "student") {
  api(
    `select * from achievement where stucode='${localStorage.student}';`
  ).then((res) => {
    studentName.value = res.res[0].name;
    tableData.value = res.res;
    let data = res.res[0];
    if (+data.vue < 60) {
      student.value.push({
        key: "VUE",
        value: data.vue,
      });
    }
    if (+data.node < 60) {
      student.value.push({
        key: "Node",
        value: data.node,
      });
    }
    if (+data.marx < 60) {
      student.value.push({
        key: "马克思主义思想",
        value: data.marx,
      });
    }
    if (+data.innovate < 60) {
      student.value.push({
        key: "创新与实践",
        value: data.innovate,
      });
    }
    if (+data.mysql < 60) {
      student.value.push({
        key: "MySql",
        value: data.mysql,
      });
    }
    if (+data.math < 60) {
      student.value.push({
        key: "高等数学",
        value: data.math,
      });
    }
  });
}
api(`select * from message`).then((res) => {
  tableData.value = res.res;
});
</script>
<style scoped lang='scss'>
.mes-box {
  padding: 20px 0px;
  border-bottom: 1px solid black;
}
.mes-title {
  font-weight: 700;
}
</style>