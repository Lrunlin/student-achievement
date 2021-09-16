<template>
  <div class="chengji-header">
    <el-select
      v-model="stuClass"
      placeholder="请选择"
      style="margin-top: 20px; margin-left: 30px; float: left"
      @change="classSelect"
    >
      <el-option
        v-for="item in setClass"
        :key="item.label"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
    </el-select>
    <el-button type="primary" class="sort" @click="setSort">
      成绩排序
      <i class="el-icon-arrow-up" v-show="isSort != 'true' && isSort"></i>
      <i class="el-icon-arrow-down" v-show="isSort != 'true' && !isSort"></i>
    </el-button>
    <el-button @click="log" type="primary" class="log">打印成绩</el-button>
    <el-button type="primary" class="log" @click="isEchart">成绩分析</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="stucode" label="学号" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column :label="label">
      <template v-slot="scope">
        <el-input
          maxlength="3"
          placeholder="分数"
          v-model="scope.row.score"
          clearable
          style="width: 100px"
          :disabled="isDisabled"
          @blur="setChengji(scope)"
          @focus="setNum(scope)"
        >
        </el-input>
      </template>
    </el-table-column>
  </el-table>
  <el-card class="box-card" v-show="excelShow">
    <template #header>
      <div class="card-header">
        <span>点击下载Excel</span>
        <el-button class="button" type="text" @click="excelShow = false"
          >关闭</el-button
        >
      </div>
    </template>
    <div class="text item">
      <a :href="excel">点击下载</a>
    </div>
  </el-card>
  <echarts :option="option" v-if="isShow" @notShow="hide(value)"></echarts>
  <el-button type="primary" round class="shenqing" @click="showApply = true"
    >申请开放</el-button
  >
  <div class="alert" v-show="showApply" @click="showApply = false">
    <div class="box" @click.stop="">
      <el-date-picker v-model="time" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-input placeholder="输入说明" v-model="mes" clearable> </el-input>
      <el-button type="primary" @click="apply">申请</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import api from "@/modules/api";
import readUser from "@/modules/common/read-user";
import updataScore from "@/modules/common/updata-score";
import teacherPrint from "@/modules/teacher/teacher-print";
import echarts from "@/components/echarts";
let store = useStore();

let isDisabled = ref(true);
api(`select * from time where id='settime';`).then((res) => {
  let times = res.res[0];
  let start = +times.start;
  let end = +times.end;
  let time = new Date().getTime();
  if (time > start && time < end) {
    isDisabled.value = false;
  }
});

let tableData = ref("");
let allData;
let subject = ref("");
let label = ref("");
readUser({ col: "teacher", id: localStorage.teacher }).then((res) => {
  label.value = res.res[0].subject + "成绩";
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
  api(`select * from achievement`).then((res) => {
    tableData.value = res.res;
    allData = res.res;
    // 将授课科目的成绩单独处理为score
    tableData.value.forEach((el, i) => {
      tableData.value[i].score = tableData.value[i][subject.value];
    });
  });
});

let stuClass = ref("");
let setClass = ref([
  {
    label: "软件工程1班",
  },
  {
    label: "软件工程2班",
  },
  {
    label: "软件工程3班",
  },
  {
    label: "软件工程4班",
  },
  {
    label: "软件工程5班",
  },
  {
    label: "软件工程6班",
  },
]);
// 查询对应班级的学生的学号，将成绩总数据的表进行遍历，如果学号对得上，说明是这个班级的，就push到tableData里面
function classSelect() {
  api(`select * from student where class='${stuClass.value}';`).then((res) => {
    let isClass = [];
    res.res.forEach((item, i) => {
      isClass.push(item.id);
    });
    tableData.value = [];
    allData.forEach((item, i) => {
      if (isClass.includes(item.stucode)) {
        tableData.value.push(item);
      }
    });
  });
}
// 获得焦点时候获取成绩存为变量，失去焦点时对比成绩是否有变化
let temporary; //临时成绩变量存储
function setNum(scope) {
  temporary = scope.row.score;
}

// 文本框失去焦点之后设置成绩
function setChengji(scope) {
  let score = scope.row.score;
  let id = scope.row.stucode;
  //   判断成绩是否修改
  if (score == temporary || isNaN(+score) || +score < 0 || +score > 100) {
    scope.row.score = score = temporary;
  } else {
    updataScore({ id: id, score: score, subject: subject.value }).then(
      (res) => {
        if (res.res) {
          ElMessage({
            message: `成功修改${scope.row.name}同学的${label.value}成绩为${score}`,
            type: "success",
            duration: 1000,
          });
        } else {
          ElMessage({
            message: "修改失败",
            type: "error",
          });
        }
      }
    );
  }
}
// 打印表格
let excel = ref("");
let excelShow = ref(false);
function log() {
  let data = {
    name: `${stuClass.value == "" ? "全部同学的" : stuClass.value}${
      label.value
    }`,
    data: [],
  };
  excel.value = store.state.excel + data.name + ".xlsx";
  data.data.push(["姓名", "学号", "成绩"]);
  tableData.value.forEach((item, index) => {
    data.data.push([
      item.name,
      item.stucode,
      item.score == "" ? "未录入" : item.score,
    ]);
  });
  teacherPrint({ data: data }).then((res) => {
    excelShow.value = true;
  });
}
// 生成表单
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
let isShow = ref(false);
function isEchart() {
  // 每次设置数量时候先清空
  option.value.series[0].data.forEach((item, index) => {
    item.value = 0;
  });
  // 设置标题
  option.value.title.text = `${
    stuClass.value == "" ? "全部同学的" : stuClass.value
  }${label.value}`;
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
function hide(value) {
  isShow.value = false;
}

let isSort = ref("true");
function setSort() {
  function compare(sort) {
    return function (obj1, obj2) {
      var value1 = +obj1["score"];
      var value2 = +obj2["score"];
      return sort ? value1 - value2 : value2 - value1; // 升序
    };
  }
  var sortObj = tableData.value.sort(compare(isSort.value));
  tableData.value = sortObj;
  isSort.value = !!!isSort.value;
}

let showApply = ref(false);
let time = ref("");
let mes = ref("");
function apply() {
  let now = new Date(time.value).getTime();
  let sql = `INSERT INTO apply ( id, settime,mes,state,teacher,time )
                       VALUES
                       ( '${new Date().getTime()}', '${now}','${
    mes.value
  }','待处理','${localStorage.teacher}',NOW() );`;
  api(sql).then((res) => {
    showApply.value = false;
  });
}
</script>
<style scoped lang='scss'>
.chengji-header {
  height: 70px;
}
.log {
  float: right;
  margin-right: 30px;
  margin-top: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  position: fixed;
  top: 100px;
  left: calc((100vw - 480px) / 2);
}
.sort {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}
.shenqing {
  position: fixed;
  bottom: 80px;
  right: 50px;
}

.alert {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgb(0, 0, 0, 0.3);
  .box {
    width: 300px;
    height: 250px;
    background: rgb(248, 248, 248);
    text-align: center;
    border-radius: 10px;
    margin: 0px auto;
    margin-top: 100px;
  }
  .el-input {
    width: 200px;
    margin-top: 30px;
  }
  .el-date-picker {
    margin-top: 20px;
  }
  .el-button {
    display: block !important;
    width: 200px;
    margin: 0px auto;
    margin-top: 20px;
  }
}
</style>