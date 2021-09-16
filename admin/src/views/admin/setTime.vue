<template>
  <h2>教师录入成绩区间</h2>
  <div class="head">
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="setTime"
    >
    </el-date-picker>
  </div>
  <h2>成绩发布</h2>
  <el-button type="primary" v-if="ishow == 'false'" @click="set('true')"
    >点击允许察看</el-button
  >
  <div class="box">
    <el-button type="danger" v-if="ishow == 'true'" @click="set('false')"
      >点击禁止察看</el-button
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
import { ElMessage } from "element-plus";
let time = ref("");
api(`select * from time where id='settime';`).then((res) => {
  let data = [new Date(+res.res[0].start), new Date(+res.res[0].end)];
  time.value = data;
});
function setTime() {
  api(
    ` UPDATE time SET start='${time.value[0].getTime()}',end='${time.value[1].getTime()}' WHERE id='settime';`
  ).then((res) => {
    console.log(res);
  });
}
let ishow = ref("");
function start() {
  api(`select * from isshow where id='show';`).then((res) => {
    ishow.value = res.res[0].watch;
  });
}
start();
function set(value) {
  api(`UPDATE isshow SET watch='${value}' WHERE id='show';`).then((res) => {
    start();
  });
}
</script>
<style scoped lang='scss'>
.head {
  text-align: center;
  margin-top: 30px;
}
h2 {
  text-align: center;
}
.box {
  text-align: center !important;
}
.el-button {
  width: 220px;
  margin: 0px auto !important;
  display: block;
}
</style>
