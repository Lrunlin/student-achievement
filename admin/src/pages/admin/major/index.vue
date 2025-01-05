<template>
  <!-- 顶部添加 -->
  <el-card>
    <div v-if="collegeIsLoading" class="h-8 w-[200px] bg-gray-100 animate-pulse"></div>
    <el-select v-else v-model="create_college_id" placeholder="选择学院" style="width: 200px">
      <el-option
        v-for="item in collegeData?.data?.list"
        :key="item.college_id"
        :label="item.college_name"
        :value="item.college_id"
      />
    </el-select>
    <el-input clearable class="mx-4" v-model="name" style="width: 240px" placeholder="创建专业" />
    <el-button type="primary" @click="create">添加专业</el-button>
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
          placeholder="搜索专业"
          :suffix-icon="Search"
        />
        <el-button type="primary" @click="refetch" class="ml-2">搜索</el-button>
      </div>
      <el-table row-key="major_id" class="!w-full" :data="data?.data?.list" style="width: 100%">
        <el-table-column label="专业信息" width="300">
          <template v-slot="scope">
            <div class="truncate" v-if="updateKey != scope.row.major_id">
              {{ scope.row.major_name }}
            </div>
            <div class="flex items-center" v-else>
              <el-input
                v-model="scope.row.major_name_temp"
                style="width: 200px"
                placeholder="修改专业名称"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学院名称" width="280">
          <template v-slot="scope">
            <div class="truncate" v-if="updateKey != scope.row.major_id">
              {{ scope.row.college_name }}
            </div>
            <el-select
              v-else
              v-model="scope.row.college_id_temp"
              placeholder="选择学院"
              style="width: 200px"
            >
              <el-option
                v-for="item in collegeData?.data?.list"
                :key="item.college_id"
                :label="item.college_name"
                :value="item.college_id"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="班级数量" width="180">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.class_count }}</div>
          </template>
        </el-table-column>

        <el-table-column label="修改名称">
          <template v-slot="scope">
            <el-button
              :disabled="updateKey == scope.row.major_id"
              type="primary"
              @click="
                () => {
                  updateKey = updateKey ? null : scope.row.major_id;
                }
              "
              >修改</el-button
            >
            <el-button
              @click="
                update(scope.row.major_id, scope.row.college_id_temp, scope.row.major_name_temp)
              "
              v-if="updateKey == scope.row.major_id"
              type="success"
              class="mx-4"
              >确认修改</el-button
            >
            <el-button
              @click="updateKey = null"
              v-if="updateKey == scope.row.major_id"
              type="danger"
              >取消</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template v-slot="scope">
            <el-button type="danger" @click="remove(scope.row.major_id)">删除</el-button>
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
let { data: collegeData, isLoading: collegeIsLoading } = useFetch(() => axios.get(`/college`), {
  callback: data => {
    if (data.success) {
      create_college_id.value = data.data.list[0].college_id;
    }
  },
});
let { data, isLoading, refetch } = useFetch(
  () => axios.get(`/major/${page.value}`, { params: { keyword: keyword.value } }),
  {
    deps: [page],
    callback: data => {
      if (data.success) {
        data.data.list.forEach((item, index) => {
          data.data.list[index].college_id_temp = data.data.list[index].college_id;
          data.data.list[index].major_name_temp = data.data.list[index].major_name;
        });
      }
      return data;
    },
  }
);

// 添加部分
let create_college_id = ref("");
let name = ref("");
function create() {
  if (/^[\s\S]*.*[^\s][\s\S]*$/.test(name.value)) {
    axios
      .post("/major", {
        name: name.value,
        college_id: create_college_id.value,
      })
      .then(res => {
        if (res.data.success) {
          ElMessage.success(res.data.message);
          name.value = "";
          refetch();
        } else {
          ElMessage.error(res.data.message);
        }
      });
  } else {
    ElMessage.warning("请填写专业名称。");
  }
}

//修改
let updateKey = ref(null);
function update(id, collegeId, name) {
  axios.put(`/major/${id}`, { majorName: name, collegeId: collegeId }).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      updateKey.value = null;
      refetch();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

// 删除
function remove(id) {
  axios.delete(`/major/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      refetch();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang="scss"></style>
