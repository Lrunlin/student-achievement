<template>
  <FromDialog
    v-model:visible="visible"
    @close="initValue = null"
    :title="updateKey ? '更新教师' : '添加教师'"
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
      >添加教师</el-button
    >
  </el-card>
  <!-- 内容部分 -->
  <el-card class="mt-4">
    <!-- 搜索部分 -->
    <div></div>
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data">
      <div class="my-2">
        <el-input clearablet v-model="name" placeholder="教师名称" style="width: 200px" />
        <el-input
          clearablet
          class="mx-2"
          v-model="teacher_id"
          placeholder="教师ID"
          style="width: 200px"
        />

        <!-- 选择学院 -->
        <el-select
          v-model="college_id"
          filterable
          clearable
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
        <el-button type="primary" @click="refetch" class="ml-4">搜索</el-button>
      </div>
      <el-table row-key="id" class="!w-full" :data="data?.data" style="width: 100%">
        <el-table-column label="姓名" width="200">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="年龄" width="110">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.age }}</div>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="80">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.sex }}</div>
          </template>
        </el-table-column>
        <el-table-column label="学院" width="180">
          <template v-slot="scope">
            <el-tag type="primary">{{ scope.row.college_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="授课信息" width="300">
          <template v-slot="scope">
            <div v-for="(item, index) in scope.row.course_data" :key="index">
              <el-tag type="primary" class="mr-2">{{ item.course_name }}</el-tag
              >:
              <el-tag class="ml-2" type="info" v-for="(item, index) in item.class_data" :key="index"
                >{{ item.major_name }}({{ item.class_index }})班</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="修改">
          <template v-slot="scope">
            <el-button type="primary" @click="change(scope.row)">修改</el-button>
          </template> </el-table-column
        >
        <el-table-column label="删除">
          <template v-slot="scope">
            <el-button type="danger" @click="remove(scope.row.id)">修改</el-button>
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
import FromDialog from "@/components/admin/teacher/FromDialog.vue";

let router = useRouter();

let visible = ref(false);

// // 查询部分
let page = ref(1);
let name = ref("");
let college_id = ref("");
let teacher_id = ref("");
let course_id = ref("");
let class_id = ref("");

// 查询列表
let { data, isLoading, refetch } = useFetch(
  () =>
    axios.get(`/teacher`, {
      params: {
        page: page.value,
        college_id: college_id.value,
        teacher_id: teacher_id.value,
        course_id: course_id.value,
        class_id: class_id.value,
        name: name.value,
      },
    }),
  { deps: [page] }
);

let { data: collegeData } = useFetch(() => axios.get(`/college`));

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
  axios.post("/teacher", values).then(res => {
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
  axios.put(`/teacher/${updateKey.value}`, values).then(res => {
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

// 对数据进行格式化
function transformTeacherData(teacher) {
  // 构造教师信息
  const transformedTeacher = {
    name: teacher.name,
    age: teacher.age,
    sex: teacher.sex,
    college_id: teacher.college_id,
    course_data: [],
  };

  // 遍历课程数据
  teacher.course_data.forEach(course => {
    // 处理每门课程，将班级ID提取为数组
    const classIds = course.class_data.map(classItem => classItem.class_id);

    // 将转换后的课程信息加入到教师的course_data中
    transformedTeacher.course_data.push({
      course_id: course.course_id,
      class_id: classIds,
    });
  });

  return transformedTeacher;
}
function change(params) {
  updateKey.value = params.id;
  initValue.value = transformTeacherData(params);
  visible.value = true;
}

function remove(id) {
  axios.delete(`/teacher/${id}`).then(res => {
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
