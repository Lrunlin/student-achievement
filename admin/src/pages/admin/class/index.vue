<template>
  <!-- 顶部添加 -->
  <el-card>
    <div v-if="majorIsLoading" class="h-8 w-[200px] bg-gray-100 animate-pulse"></div>
    <div v-else>
      <el-select v-model="major_id" placeholder="选择专业" style="width: 200px" @change="refetch()">
        <el-option
          v-for="item in majorData?.data?.list"
          :key="item.major_id"
          :label="item.major_name"
          :value="item.major_id"
        />
      </el-select>
      <el-popconfirm
        :title="`是否为 
        ${major_name}
        添加班级`"
        @confirm="create()"
        confirm-button-text="确定"
        cancel-button-text="取消"
      >
        <template #reference>
          <el-button type="primary" class="ml-2">添加班级</el-button>
        </template>
      </el-popconfirm>
    </div>
  </el-card>
  <!-- 表格 -->
  <el-card class="mt-4">
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton class="mt-4" :rows="5" />
    </div>
    <div v-if="data?.data?.list">
      <el-table row-key="major_id" class="!w-full" :data="data?.data?.list" style="width: 100%">
        <el-table-column label="班级" width="180">
          <template v-slot="scope">
            <div class="truncate" v-if="updateKey != scope.row.class_id">
              {{ major_name }}<span class="font-bold mx-0.5">({{ scope.row.class_index }}) </span>班
            </div>
            <el-input-number v-else v-model="scope.row.class_index_temp" :min="1" />
          </template>
        </el-table-column>
        <el-table-column label="学生数量" width="300">
          <template v-slot="scope">
            <div class="truncate">{{ scope.row.student_count }}</div>
          </template>
        </el-table-column>
        <el-table-column label="修改" width="300">
          <template v-slot="scope">
            <el-button
              :disabled="updateKey == scope.row.class_id"
              type="primary"
              @click="
                () => {
                  updateKey = updateKey ? null : scope.row.class_id;
                }
              "
              >修改班级</el-button
            >
            <el-button
              @click="update(scope.row.class_id, scope.row.class_index_temp)"
              v-if="updateKey == scope.row.class_id"
              type="success"
              class="mx-4"
              >确认修改</el-button
            >
            <el-button
              @click="updateKey = null"
              v-if="updateKey == scope.row.class_id"
              type="danger"
              >取消</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="删除班级">
          <template v-slot="scope">
            <el-tooltip effect="dark">
              <template #content>
                <div v-if="scope.row.student_count != 0">只有学生数量为0的班级才可以删除。</div>
                <div v-else>删除班级</div>
              </template>
              <el-button
                :disabled="scope.row.student_count != 0"
                type="danger"
                @click="remove(scope.row.class_id)"
                >删除班级</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        v-if="data"
        v-model:current-page="page"
        class="mt-4 flex justify-center"
        background
        layout="prev, pager, next"
        :total="data.data.total"
        @current-change="refetch()"
      /> -->
    </div>
  </el-card>
</template>
<script setup>
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

let router = useRouter();

// 查询部分
let page = ref(1);
let keyword = ref("");
let { data: majorData, isLoading: majorIsLoading } = useFetch(
  () => axios.get(`/major/${page.value}`, { params: { keyword: keyword.value } }),
  {
    callback: data => {
      major_id.value = data.data.list[0]?.major_id;
      refetch();
    },
  }
);

let major_id = ref(""); //当前选择的专业ID
let major_name = computed(
  () => majorData.value?.data?.list?.find(item => item.major_id == major_id.value)?.major_name
);
let { data, isLoading, refetch } = useFetch(() => axios.get(`/class/${major_id.value}`), {
  manual: true,
  callback: data => {
    if (data.success) {
      data.data.list.forEach((item, index) => {
        data.data.list[index].class_index_temp = data.data.list[index].class_index;
      });
    }
  },
});

// 添加部分
function create() {
  axios
    .post("/class", {
      major_id: major_id.value,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success(res.data.message);
        refetch();
      } else {
        ElMessage.error(res.data.message);
      }
    });
}

//修改
let updateKey = ref(null);
function update(id, index) {
  axios.put(`/class/${id}`, { index: index }).then(res => {
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
  axios.delete(`/class/${id}`).then(res => {
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
