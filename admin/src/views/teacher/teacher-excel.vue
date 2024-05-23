<template>
  <div class="upload" v-if="!tableData.length">
    <input type="file" ref="file" id="file" style="display: none" accept=".xlsx" @change="load" />
    <label for="file" class="el-button el-button--primary">
      <el-icon><UploadFilled /></el-icon>
      上传文件
    </label>
  </div>
  <div v-if="tableData.length">
    <el-button type="primary" @click="log" class="log">打印当前成绩</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="学生姓名" width="180"> </el-table-column>
      <el-table-column prop="stucode" label="学生学号" width="180"> </el-table-column>
      <el-table-column :label="showScore">
        <template v-slot="scope">
          <el-input
            placeholder="请输入成绩"
            v-model="scope.row.score"
            clearable
            style="width: 200px"
            :min="0"
            :max="100"
            maxlength="3"
            @focus="save(scope.row.score)"
            @blur="change(scope.row.stucode, scope.row.score, scope.$index)"
          >
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <echarts :option="option" v-if="isShow" @notShow="hide(value)"></echarts>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/modules/api";
import axios from "axios";
import uploadExcel from "@/modules/upload-excel";
import teacherPrint from "@/modules/teacher/teacher-print";
import { useStore } from "vuex";
import echarts from "@/components/echarts";
import { UploadFilled } from "@element-plus/icons-vue";

let router = useRouter();
let store = useStore();
let showScore = ref(""); //表格上面的文字
let subject = ref("");
api(`select * from teacher where id='${localStorage.teacher}';`).then(res => {
  showScore.value = res.res[0].subject + "成绩";
  switch (res.res[0].subject) {
    case "创新与实践":
      subject.value = "innovate";
      break;
    case "马克思主义思想":
      subject.value = "marx";
      break;
    case "高等数学":
      subject.value = "math";
      break;
    case "VUE.js":
      subject.value = "vue";
      break;
    case "Node.js":
      subject.value = "node";
      break;
    case "MySQL数据库":
      subject.value = "mysql";
      break;
  }
});
let tableData = ref([]);
let file = ref(null);
let isShow = ref(false);
function isEchart() {
  // 每次设置数量时候先清空
  option.value.series[0].data.forEach((item, index) => {
    item.value = 0;
  });
  // 设置标题
  option.value.title.text = "成绩单";
  // 遍历数组设置个数
  tableData.value.forEach((item, index) => {
    let i;
    if (+item.score < 60 && item.score != "") {
      i = 0;
    } else if (+item.score > 60 && +item.score < 81) {
      i = 1;
    } else if (+item.score > 80 && +item.score < 90) {
      i = 2;
    } else if (+item.score > 89 && +item.score < 101) {
      i = 3;
    } else {
      i = 4;
    }
    option.value.series[0].data[i].value++;
  });
  isShow.value = true;
}
function load() {
  let fromD = new FormData();
  fromD.append(subject.value, file.value.files[0]);
  uploadExcel(fromD).then(res => {
    if (res.data.length) {
      tableData.value = res.data;
      isEchart();
      isShow.value = true;
    } else {
      alert("excel格式上传失败或没有数据");
      router.go(0);
    }
  });
}

let score;
function save(s) {
  score = +s;
  console.log(score);
}
function change(id, s, index) {
  console.log(score);
  if (+s != +score && +s >= 0 && +s <= 100) {
    let sql = `UPDATE achievement SET ${subject.value}='${s}' WHERE stucode='${id}';`;
    api(sql).then(res => {
      // console.log(res);
    });
  } else {
    tableData.value[index].score = score + "";
  }
}

let excel = ref("");
function log() {
  let data = {
    name: `${showScore.value}${Math.random().toString().substring(3, 7)}`,
    data: [],
  };
  excel.value = store.state.excel + data.name + ".xlsx";
  data.data.push(["姓名", "学号", "成绩"]);
  tableData.value.forEach((item, index) => {
    data.data.push([item.name, item.stucode, item.score == "" ? "未录入" : item.score]);
  });
  teacherPrint({ data: data }).then(res => {
    window.open(excel.value);
  });
}
let option = ref({
  title: {
    text: "成绩展示",
    left: "center",
  },
  color: ["red", "green", "yellow", "blueviolet", "gray"],

  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      data: [
        { value: 0, name: "不及格" },
        { value: 0, name: "中等" },
        { value: 0, name: "良好" },
        { value: 0, name: "优秀" },
        { value: 0, name: "未登记" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

function hide(value) {
  isShow.value = false;
}
</script>
<style scoped lang="scss">
.upload {
  margin-top: 100px;
  text-align: center;
}

.log {
  margin-top: 20px;
  margin-left: 30px;
}
</style>
