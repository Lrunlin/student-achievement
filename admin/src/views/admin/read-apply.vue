<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="teacher" label="申请教师" width="180"> </el-table-column>
    <el-table-column label="留言" width="180">
      <template v-slot="scope">
        <el-tooltip class="item" effect="dark" :content="scope.row.mes" placement="top-start">
          <span>触碰查看</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="时间">
      <template v-slot="scope">
        <!-- <span>{{ new Date(+scope.row.settime) }}</span> -->
        <span>{{ timestampToTime(+scope.row.settime) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="通过" width="180">
      <template v-slot="scope">
        <el-button type="success" :icon="Check" circle @click="ok(scope)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
import { ElMessage } from "element-plus";
import { Check } from "@element-plus/icons-vue";

let tableData = ref([]);
api(`select * from apply where state='待处理';`).then(res => {
  tableData.value = res.res;
});

function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D;
  //   + h + m + s;
}

function ok(scope) {
  let time = scope.row.settime;
  let sql = `UPDATE time set end='${time}' where id='settime';`;
  api(sql).then(res => {
    tableData.value.splice(scope.$index, 1);
    ElMessage.success({
      message: "修改成功",
      type: "success",
    });
    api(`UPDATE apply set state='通过' where id='${scope.row.id}';`);
  });
}
</script>
<style scoped lang="scss"></style>
