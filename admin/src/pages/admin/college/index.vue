<template>
  <!-- 顶部添加 -->
  <el-card>
    <el-input clearable v-model="name" style="width: 240px" placeholder="创建学院" />
    <el-button type="primary" @click="create" class="ml-4">添加学院</el-button>
  </el-card>
  <!-- 表格 -->
  <el-card class="mt-4">
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data?.list">
      <div class="my-2">
        <el-input
          clearable
          v-model="keyword"
          style="width: 300px"
          placeholder="搜索学院"
          :suffix-icon="Search"
        />
        <el-button type="primary" @click="refetch" class="ml-2">搜索</el-button>
      </div>
      <el-table row-key="college_id" class="!w-full" :data="data?.data?.list" style="width: 100%">
        <el-table-column label="学院信息" width="300">
          <template v-slot="scope">
            <div class="truncate" v-if="updateKey != scope.row.college_id">
              {{ scope.row.college_name }}
            </div>
            <div class="flex items-center" v-else>
              <el-input
                v-model="scope.row.college_name_temp"
                style="width: 200px"
                placeholder="修改学院名称"
              />
              <el-icon
                @click="update(scope.row.college_id, scope.row.college_name_temp)"
                class="!text-green-700 ml-3"
                ><Select
              /></el-icon>
              <el-icon @click="updateKey = null" class="!text-red-700 ml-2"><CloseBold /></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="专业数量" width="180">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.major_count }}</div>
          </template>
        </el-table-column>
        <el-table-column label="教师数量" width="180">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.teacher_count }}</div>
          </template>
        </el-table-column>
        <el-table-column label="学生数量" width="180">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.student_count }}</div>
          </template>
        </el-table-column>
        <el-table-column label="修改名称">
          <template v-slot="scope">
            <el-button
              type="primary"
              @click="
                () => {
                  updateKey = updateKey ? null : scope.row.college_id;
                }
              "
              >修改</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template v-slot="scope">
            <el-button type="danger" @click="remove(scope.row.college_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="data"
        v-model:current-page="page"
        class="mt-4 flex justify-center"
        background
        layout="prev, pager, next"
        :total="data.data.total"
        @current-change="refetch()"
      />
    </div>
  </el-card>
</template>
<script setup>
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { Select, CloseBold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";

let router = useRouter();

// 查询部分
let page = ref(1);
let keyword = ref("");
let { data, isLoading, refetch } = useFetch(
  () => axios.get(`/college/${page.value}`, { params: { keyword: keyword.value } }),
  {
    deps: [page],
    callback: data => {
      if (data.success) {
        data.data.list.forEach((item, index) => {
          data.data.list[index].college_name_temp = data.data.list[index].college_name;
        });
      }
      return data;
    },
  }
);

// 添加部分
let name = ref("");
function create() {
  if (/^[\s\S]*.*[^\s][\s\S]*$/.test(name.value)) {
    axios.post("/college", { name: name.value }).then(res => {
      if (res.data.success) {
        ElMessage.success(res.data.message);
        name.value = "";
        refetch();
      } else {
        ElMessage.error(res.data.message);
      }
    });
  } else {
    ElMessage.warning("请填写学院名称。");
  }
}

//修改名称
let updateKey = ref(null);

function update(id, name) {
  axios.put(`/college/${id}`, { name: name }).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      updateKey.value = null;
      refetch();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function remove(id) {
  axios.delete(`/college/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      updateKey.value = null;
      refetch();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang="scss"></style>
