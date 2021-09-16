<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="标题" width="180">
      <template v-slot="scope">
        <div class="title">{{ scope.row.title }}</div>
      </template>
    </el-table-column>
    <el-table-column label="内容" width="180">
      <template v-slot="scope">
        <el-tooltip
          class="item"
          effect="dark"
          :content="scope.row.text"
          placement="top"
        >
          <div>触碰察看大致内容</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="发布时间"
      ><template v-slot="scope">{{ scope.row.time }}</template></el-table-column
    >
    <el-table-column label="删除"
      ><template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="remove(scope)"
        ></el-button></template
    ></el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
import { ElMessage } from "element-plus";
let tableData = ref("");
api(`select * from message`).then((res) => {
  tableData.value = res.res;
});
function remove(data) {
  let id = data.row.id;
  let index = data.$index;
  api(`DELETE FROM message where id='${id}';`).then((res) => {
    if (res.res) {
      tableData.value.splice(index, 1);
      ElMessage.success({
        message: "删除成功",
        type: "success",
        duration: 1000,
      });
    } else {
      ElMessage({
        message: "删除成功",
        type: "error",
        duration: 1000,
      });
    }
  });
}
</script>
<style scoped lang='scss'>
.title {
  width: 150px;
  height: 20px;
  overflow: hidden;
}
</style>