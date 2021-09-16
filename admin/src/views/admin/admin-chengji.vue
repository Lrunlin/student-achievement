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
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
let tableData = ref("");
api(`select * from achievement`).then((res) => {
  tableData.value = res.res;
});
</script>
<style scoped lang='scss'>
</style>