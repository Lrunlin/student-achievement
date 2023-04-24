<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="学生姓名" width="180">
    </el-table-column>
    <el-table-column prop="stucode" label="学号" width="180"> </el-table-column>
    <el-table-column prop="vue" label="VUE.js"> </el-table-column>
    <el-table-column prop="node" label="node.js"> </el-table-column>
    <el-table-column prop="marx" label="马克思"> </el-table-column>
    <el-table-column prop="innovate" label="创新"> </el-table-column>
    <el-table-column prop="mysql" label="MySQL"> </el-table-column>
    <el-table-column prop="math" label="高数"> </el-table-column>
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button type="danger" icon="el-icon-delete" circle
          @click="remove(scope.row.stucode, scope.$index)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
import { ElMessage } from "element-plus";


let tableData = ref([]);
api(`select * from achievement`).then((res) => {
  tableData.value = res.res;
});

function remove(id, index) {
  api(`DELETE FROM achievement WHERE stucode="${id}";`).then((res) => {
    if (res.res.affectedRows) {
      tableData.value.splice(index, 1)
    } else {
      ElMessage.error('删除失败')
    }
  });
}

</script>
<style scoped lang='scss'></style>