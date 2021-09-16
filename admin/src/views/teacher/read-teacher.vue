<template>
  <el-select v-model="subject" placeholder="请选择" @change="select">
    <el-option
      v-for="item in subjects"
      :key="item.label"
      :label="item.label"
      :value="item.label"
    >
    </el-option>
  </el-select>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{ prop: 'time', order: 'descending' }"
  >
    <el-table-column label="工号" width="180">
      <template v-slot="scope">
        <span @click="change(scope)">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
    <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
    <el-table-column prop="subject" label="授课" width="160"> </el-table-column>
    <el-table-column prop="tel" label="手机号码" width="180"> </el-table-column>
    <el-table-column prop="time" label="入职日期" width="180" sortable>
    </el-table-column>
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="remove(scope.row.id, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import api from "@/modules/api";
import deleteUser from "@/modules/common/delete-user";
import { useRouter } from "vue-router";
let router = useRouter();
let tableData = ref([]);
api(`select * from teacher`).then((res) => {
  tableData.value = res.res;
});
function change(data) {
  router.push({ path: "/updata-teacher", query: { id: data.row.id } });
}
function remove(id, index) {
  deleteUser({ col: "teacher", id: id }).then((res) => {
    if (res.res) {
      router.go(0);
    }
  });
}
let subject = ref("创新与实践");
let subjects = ref([
  {
    label: "创新与实践",
  },
  {
    label: "马克思主义思想",
  },
  {
    label: "高等数学",
  },
  {
    label: "VUE.js",
  },
  {
    label: "Node.js",
  },
  {
    label: "MySQL数据库",
  },
]);

function select() {
  api(`select * from teacher where subject='${subject.value}';`).then((res) => {
    tableData.value = res.res;
  });
}
</script>
<style scoped lang='scss'>
.el-select {
  margin-top: 20px;
  margin-left: 30px;
}
</style>