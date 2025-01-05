<template>
  <FromDialog
    v-model:visible="visible"
    @close="initValue = null"
    :title="updateKey ? '更新学生' : '添加学生'"
    :initValue="initValue"
    @submit="submit"
  />
  <!-- 顶部添加 -->
  <el-card>
    <el-button
      type="primary"
      @click="
        visible = true;
        initValue = null;
      "
      class="ml-4"
      >添加学生</el-button
    >
  </el-card>
  <!-- 内容部分 -->
  <el-card class="mt-4">
    <!-- 搜索部分 -->
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data">
      <el-tabs type="border-card">
        <el-tab-pane :key="index" v-for="(item, index) in data.data" :label="item.college_name">
          <el-tabs type="border-card">
            <el-tab-pane :key="index" v-for="(major, index) in item.major_data" :label="major.name">
              <el-tabs type="border-card" @tab-click="e => change(e.index, major.class_data)">
                <el-tab-pane
                  :key="index"
                  v-for="(item, index) in major.class_data"
                  :label="`${major.name} (${item.class_index})班`"
                >
                  <el-table class="!w-full" :data="studentData?.list" style="width: 100%">
                    <el-table-column label="姓名" width="200">
                      <template v-slot="scope">
                        <div class="truncate">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="年龄" width="80">
                      <template v-slot="scope">
                        <div class="truncate">{{ scope.row.age }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="性别" width="80">
                      <template v-slot="scope">
                        <div class="truncate">{{ scope.row.sex }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="入学时间" width="260">
                      <template v-slot="scope">
                        <el-date-picker v-model="scope.row.create_time" type="datetime" />
                      </template>
                    </el-table-column>
                    <el-table-column label="修改">
                      <template v-slot="scope">
                        <el-button type="primary" @click="changeStudent(scope.row)">修改</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="删除">
                      <template v-slot="scope">
                        <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>

      <el-pagination
        v-if="studentData"
        v-model:current-page="page"
        class="mt-4 flex justify-center"
        background
        layout="prev, pager, next"
        :total="studentData.total"
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
import FromDialog from "@/components/admin/student/FromDialog.vue";

let router = useRouter();

let visible = ref(false);

let class_id = ref(null);
// 查询列表
let { data, isLoading, refetch } = useFetch(() => axios.get(`/tree/college-major-class`), {
  callback: data => {
    if (!class_id.value) {
      class_id.value = data.data[0]?.major_data[0]?.class_data[0]?.class_id;
    }
  },
});

// 点击提交按钮
function submit(values) {
  if (updateKey.value) {
    update(values);
  } else {
    create(values);
  }
}

// 添加部分
function create(values) {
  axios.post("/student", values).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      visible.value = false;
      refetch();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

//修改名称
let updateKey = ref(null);
let initValue = ref(null);
function update(values) {
  axios.put(`/student/${updateKey.value}`, values).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      refetch();
      updateKey.value = null;
      initValue.value = null;
      visible.value = false;
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

let page = ref(1);
function change(index, list) {
  class_id.value = list[index]?.class_id;
}
let studentData = ref({ total: 0, list: [] });
watchEffect(() => {
  axios.get("/student", { params: { page: page.value, class_id: class_id.value } }).then(res => {
    studentData.value = { total: res.data?.data?.total, list: res.data?.data?.list };
  });
});

function changeStudent(params) {
  updateKey.value = params.id;
  initValue.value = params;
  visible.value = true;
}

function remove(id) {
  axios.delete(`/student/${id}`).then(res => {
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
