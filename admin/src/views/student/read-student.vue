<template>
  <el-select
    class="!w-60 my-4 ml-2"
    v-model="stuClass"
    placeholder="请选择查看的班级"
    @change="select"
  >
    <el-option v-for="item in setClass" :key="item.label" :label="item.label" :value="item.label">
    </el-option>
  </el-select>
  <el-input
    placeholder="请输入学生姓名"
    v-model="stuName"
    class="stu-name"
    clearable
    v-if="isAdmin"
  >
  </el-input>
  <el-button :icon="Search" @click="search" class="search-btn" circle v-if="isAdmin"></el-button>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{ prop: 'time', order: 'descending' }"
  >
    <el-table-column label="学号" width="180">
      <template v-slot="scope">
        <span @click="change(scope)">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
    <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
    <el-table-column prop="class" label="班级" width="160"> </el-table-column>
    <el-table-column prop="tel" label="手机号码" width="180"> </el-table-column>
    <el-table-column prop="time" label="入校日期" width="180" sortable> </el-table-column>
    <el-table-column label="删除" v-if="isTeacher != 'teacher'">
      <template v-slot="scope">
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="remove(scope.row.id, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="mt-6 flex justify-center">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="max"
      @current-change="page($event)"
    >
    </el-pagination>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import api from "@/modules/api";
import deleteUser from "@/modules/common/delete-user";
import { useRouter } from "vue-router";
import { Delete, Search } from "@element-plus/icons-vue";

let isAdmin = localStorage.id == "admin";
let isTeacher = localStorage.id;
let router = useRouter();
let data = ref([]);
let max = ref(0);
let index = ref(0);
let tableData = computed(() => data.value.slice(0 + index.value * 10, 0 + (index.value + 1) * 10));

function page(page) {
  index.value = page - 1;
}

api(`select * from student`).then(res => {
  data.value = res.res;
  max.value = res.res.length;
});
function change(data) {
  if (localStorage.id == "admin") {
    router.push({ path: "/updata-student", query: { id: data.row.id } });
  }
}
function remove(id, index) {
  deleteUser({ col: "student", id: id }).then(res => {
    if (res.res) {
      api(`DELETE FROM achievement WHERE stucode='${id}';`).then(res => {
        router.go(0);
      });
    }
  });
}
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

function select() {
  api(`select * from student where class='${stuClass.value}';`).then(res => {
    data.value = res.res;
  });
}
let stuName = ref("");
function search() {
  let sql = `SELECT * from student  WHERE name LIKE '%${stuName.value}%';`;
  api(sql).then(res => {
    data.value = res.res;
  });
}
</script>
<style scoped lang="scss">
.stu-name {
  width: 200px;
  margin-left: 20px;
}
.search-btn {
  margin-left: 10px;
}
</style>
