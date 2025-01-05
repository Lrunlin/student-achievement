<template>
  <FromDialog
    @close="initValue = null"
    v-model:visible="visible"
    @submit="submit"
    :initValue="initValue"
  />
  <!-- 顶部添加 -->
  <el-card>
    <el-button
      type="primary"
      @click="
        visible = true;
        initValue = null;
      "
      >添加课程</el-button
    >
  </el-card>
  <!-- 表格 -->
  <el-card class="mt-4">
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data?.list">
      <!-- 搜索 -->
      <div class="my-2">
        <el-input clearable v-model="course_name" placeholder="课程名称" style="width: 200px" />
        <el-input
          clearable
          class="mx-2"
          v-model="course_id"
          placeholder="课程ID"
          style="width: 200px"
        />
        <!-- 选择专业 -->
        <el-select
          filterable
          clearable
          v-model="major_id"
          placeholder="选择专业"
          style="width: 200px"
        >
          <el-option
            v-for="item in majorData?.data?.list"
            :key="item.major_id"
            :label="item.college_name + ': ' + item.major_name"
            :value="item.major_id"
          />
        </el-select>
        <el-button type="primary" @click="refetch" class="ml-4">搜索</el-button>
      </div>
      <!-- 内容 -->
      <el-table row-key="id" class="!w-full" :data="data?.data?.list" style="width: 100%">
        <el-table-column label="课程名称" width="200">
          <template v-slot="scope">
            <div class="truncate">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属专业" width="280">
          <template v-slot="scope">
            <div class="truncate">
              {{ scope.row.major_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学分" width="120">
          <template v-slot="scope">
            {{ scope.row.credit }}
          </template>
        </el-table-column>
        <el-table-column label="满分" width="120">
          <template v-slot="scope">
            {{ scope.row.total_score }}
          </template>
        </el-table-column>
        <el-table-column label="学期" width="80">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.semester }}</div>
          </template>
        </el-table-column>

        <el-table-column label="修改名称">
          <template v-slot="scope">
            <el-button
              type="primary"
              @click="
                () => {
                  updateKey = scope.row.id;
                  initValue = scope.row;
                  visible = true;
                }
              "
              >修改</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="删除课程">
          <template v-slot="scope">
            <el-popover
              placement="top-start"
              title="确认删除课程？"
              :width="200"
              trigger="hover"
              content="同时删除绑定的教师授课和成绩单。"
            >
              <template #reference>
                <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
              </template>
            </el-popover>
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
import FromDialog from "@/components/admin/course/FromDialog.vue";

let router = useRouter();

let visible = ref(false);

// 查询部分
let page = ref(1);

let major_id = ref("");
let course_id = ref("");
let course_name = ref("");
let { data, isLoading, refetch } = useFetch(
  () =>
    axios.get(`/course`, {
      params: {
        page: page.value,
        course_id: course_id.value,
        course_name: course_name.value,
        major_id: major_id.value,
      },
    }),
  {
    deps: [page],
  }
);

let { data: majorData } = useFetch(() => axios.get(`/major`));

function submit(values) {
  if (updateKey.value) {
    update(values);
  } else {
    create(values);
  }
}

// 添加部分
function create(values) {
  axios.post("/course", values).then(res => {
    if (res.data.success) {
      refetch();
      visible.value = false;
      ElMessage.success(res.data.message);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

//修改
let updateKey = ref(null);
let initValue = ref(null);
function update(values) {
  axios.put(`/course/${updateKey.value}`, { ...values }).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      updateKey.value = null;
      visible.value = false;
      initValue.value = null;
      refetch();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function remove(id) {
  axios.delete(`/course/${id}`).then(res => {
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
