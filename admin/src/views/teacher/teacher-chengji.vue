<template>
  <div class="flex justify-between mt-4">
    <div class="flex justify-between">
      <el-select v-model="stuClass" placeholder="请选择" @change="classSelect" class="!ml-2 !w-60">
        <el-option
          v-for="item in setClass"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <el-button type="primary" class="ml-3" @click="setSort">
        成绩排序
        <el-icon v-show="isSort != 'true' && isSort"><ArrowUp /></el-icon>
        <el-icon v-show="isSort != 'true' && !isSort"><ArrowDown /></el-icon>
      </el-button>
    </div>
    <div class="flex justify-between">
      <el-button @click="log" type="primary">打印成绩</el-button>
      <el-button type="primary" class="mx-4" @click="isEchart">成绩分析</el-button>
      <div class="mr-4">
        <input
          type="file"
          ref="file"
          id="file"
          style="display: none"
          accept=".xlsx"
          @change="load"
        />
        <label for="file" class="el-button el-button--primary">
          <el-icon><UploadFilled /></el-icon>
          上传文件
        </label>
      </div>
    </div>
  </div>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="stucode" label="学号" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column :label="label">
      <template v-slot="scope">
        <el-button :disabled="isDisabled" @click="setNum(scope)">
          {{ scope.row.score || "未输入" }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <echarts v-model:isShow="isShow" :option="option" v-if="isShow"></echarts>
  <el-button type="primary" round class="fixed bottom-4 right-4" @click="showApply = true"
    >申请开放</el-button
  >

  <el-dialog v-model="showApply" title="申请开发成绩修改" width="500">
    <div class="w-full flex justify-center flex-wrap">
      <el-date-picker class="!w-80 block" v-model="time" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-input
        class="!w-80 block mt-4"
        :rows="4"
        type="textarea"
        placeholder="输入说明"
        v-model="mes"
        clearable
      >
      </el-input>
    </div>
    <template #footer>
      <el-button @click="showApply = false">取消</el-button>
      <el-button type="primary" @click="apply">申请</el-button>
    </template>
  </el-dialog>

  <!-- 修改成绩弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="`修改学号为: ${showDataOption.user_id} 的学生${label}？`"
    :before-close="beforClose"
  >
    <table>
      <tr>
        <td></td>
        <td>占比</td>
        <td>分数</td>
      </tr>
      <tr>
        <td>平时成绩</td>
        <td>
          <el-input-number
            v-model="showDataOption.cumulative"
            :min="0"
            :max="100"
            @change="
              value => {
                showDataOption.end = 100 - value;
              }
            "
          />
        </td>
        <td>
          <el-input-number v-model="showDataOption.cumulative_count" :min="0" :max="100" />
        </td>
      </tr>
      <tr>
        <td>期末成绩</td>
        <td>
          <el-input-number
            v-model="showDataOption.end"
            :min="0"
            :max="100"
            @change="
              value => {
                showDataOption.cumulative = 100 - value;
              }
            "
          />
        </td>
        <td>
          <el-input-number v-model="showDataOption.end_count" :min="0" :max="100" />
        </td>
      </tr>
    </table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="setChengji">确认录入</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElNotification } from "element-plus";
import api from "@/modules/api";
import readUser from "@/modules/common/read-user";
import updataScore from "@/modules/common/updata-score";
import teacherPrint from "@/modules/teacher/teacher-print";
import echarts from "@/components/echarts";
import { v4 } from "uuid";
import axios from "axios";
import { useRouter } from "vue-router";
import { ArrowDown, ArrowUp,UploadFilled} from "@element-plus/icons-vue";

let store = useStore();
let router = useRouter();
let isDisabled = ref(true);
api(`select * from time where id='settime';`).then(res => {
  let times = res.res[0];
  let start = +times.start;
  let end = +times.end;
  let time = new Date().getTime();
  if (time > start && time < end) {
    isDisabled.value = false;
  }
});
let isShow = ref(false); //是否显示表格弹窗

let tableData = ref("");
let allData;
let subject = ref("");
let label = ref("");
readUser({ col: "teacher", id: localStorage.teacher }).then(res => {
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
  api(`select * from achievement`).then(res => {
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
  api(`select * from student where class='${stuClass.value}';`).then(res => {
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
let dialogVisible = ref(false);
let showDataOption = ref({
  user_id: "",
  //平时分、占比/期末分数、占比
  cumulative: 40,
  cumulative_count: 0,
  end: 60,
  end_count: 0,
});
const beforClose = () => {
  dialogVisible.value = false;
  showDataOption.value = {
    user_id: "",
    cumulative: 40,
    cumulative_count: 0,
    end: 60,
    end_count: 0,
  };
};
function setNum(scope) {
  showDataOption.value.user_id = scope.row.stucode;
  dialogVisible.value = true;
}

// 文本框失去焦点之后设置成绩
function setChengji() {
  //   判断成绩是否修改
  let id = showDataOption.value.user_id; //ID
  let score = (
    (showDataOption.value.cumulative_count / 100) * showDataOption.value.cumulative +
    (showDataOption.value.end_count / 100) * showDataOption.value.end
  ).toFixed(0); //成绩计算
  updataScore({ id: id, score: score, subject: subject.value }).then(res => {
    if (res.res) {
      ElMessage({
        message: `成功修改ID: ${id} 同学的${label.value}成绩为${score}`,
        type: "success",
        duration: 1000,
      });
      tableData.value.find(item => item.stucode == id).score = score;
    } else {
      ElMessage({
        message: "修改失败",
        type: "error",
      });
    }
    dialogVisible.value = false;
  });
}
// 打印表格
function log() {
  let data = {
    name: v4(),
    data: [],
  };
  let excel = store.state.excel + data.name + ".xlsx";
  data.data.push(["姓名", "学号", "成绩"]);
  tableData.value.forEach((item, index) => {
    data.data.push([item.name, item.stucode, item.score == "" ? "未录入" : item.score]);
  });
  teacherPrint({ data: data }).then(res => {
    ElNotification({
      title: "下载Excel",
      dangerouslyUseHTMLString: true,
      message: `<a href="${excel}" download="true" target="_blank">点击下载表格</a>`,
      duration: 0,
    });
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
function isEchart() {
  // 每次设置数量时候先清空
  option.value.series[0].data.forEach((item, index) => {
    item.value = 0;
  });
  // 设置标题
  option.value.title.text = `${stuClass.value == "" ? "全部同学的" : stuClass.value}${label.value}`;
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
  if (!mes.value || isNaN(Date.parse(time.value))) {
    ElMessage({
      message: "格式错误",
      type: "warning",
    });
    return;
  }
  let now = new Date(time.value).getTime();
  let sql = `INSERT INTO apply ( id, settime,mes,state,teacher,time )
                       VALUES
                       ( '${v4()}', '${now}','${mes.value}','待处理','${
    localStorage.teacher
  }',NOW() );`;
  api(sql).then(res => {
    showApply.value = false;
  });
}

let file = ref(null);
function load() {
  let from = new FormData();
  from.append(subject.value, file.value.files[0]);
  axios({
    method: "POST",
    url: "/import",
    data: from,
  }).then(res => {
    ElMessage.success("上传成功");
    router.go(0);
  });
}
</script>
<style scoped lang="scss">
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
</style>
