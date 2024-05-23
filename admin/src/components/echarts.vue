<template>
  <el-dialog v-model="prop.isShow" @opened="create" title="数据统计" :before-close="notShow">
    <div class="box">
      <div id="main" @click.stop=""></div>
      <div id="show" @click.stop=""></div>
    </div>
  </el-dialog>
</template>
<script setup>
import * as echarts from "echarts";
import axios from 'axios';

let prop = defineProps({ option: Object, isShow: Boolean });
let emit = defineEmits();
function notShow() {
  emit("update:isShow", false);
}

function create() {
  console.log(1);
  var myChart = echarts.init(document.getElementById("main"));
  myChart.setOption(prop.option);
  axios.get(`/statistics/${localStorage.getItem('teacher')}`).then(res => {
    var echart = echarts.init(document.getElementById("show"));
    echart.setOption({
      title: { text: '成绩散点' },
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 10,
          data: res.data.data,
          type: 'scatter'
        }
      ]
    });
  })
}


</script>
<style scoped lang="scss">
.box {
  display: flex;
  padding: 10px;
}

#show {
  width: 400px;
  height: 500px;
}

#main {
  width: 400px;
  height: 500px;
}
</style>
