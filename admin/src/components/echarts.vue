<template>
  <div class="box" v-show="echartsShow">
    <div class="ceng" @click="notShow"></div>
    <div id="main" @click.stop=""></div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmit } from "vue";
import * as echarts from "echarts";
let prop = defineProps({ option: Object, isShow: Boolean });
let echartsShow = ref(true);
let emit = defineEmit();
let showValue = ref(false);
function notShow() {
  emit("notShow", showValue);
}
onMounted(() => {
  var myChart = echarts.init(document.getElementById("main"));
  myChart.setOption(prop.option);
});
</script>
<style scoped lang='scss'>
.box {
  position: absolute;
  top: 100px;
}
.ceng {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.3);
  z-index: 9999999;
}
#main {
  width: 400px;
  height: 500px;
  position: fixed;
  left: 200px;
  top: 0px;
  z-index: 99999919;
}
</style>
