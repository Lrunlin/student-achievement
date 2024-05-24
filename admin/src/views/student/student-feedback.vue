<template>
  <el-card class="mt-4 mx-2">
    <div style="width: 400px" class="flex justify-center flex-wrap mx-auto">
      <div class="w-full">
        <el-input
          v-model="content"
          style="width: 400px"
          :rows="8"
          type="textarea"
          placeholder="反馈"
        />
      </div>
      <el-button class="mt-4" type="primary" block style="width: 400px" @click="submit"
        >反馈</el-button
      >
    </div>
  </el-card>
  <el-card class="mt-4">
    <el-table :data="data" style="width: 100%">
      <el-table-column label="内容" width="380">
        <template #default="scope">
          <el-input
            v-model="scope.row.student_content"
            style="width: 300px"
            :rows="4"
            :readonly="true"
            type="textarea"
            placeholder="反馈"
          />
        </template>
      </el-table-column>
      <el-table-column label="回复" width="380">
        <template #default="scope">
          <el-input
            v-model="scope.row.teacher_content"
            style="width: 300px"
            :rows="4"
            :readonly="true"
            type="textarea"
            placeholder="反馈"
          />
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template #default="scope">
          <div>
            <el-date-picker
              v-model="scope.row.create_time"
              type="datetime"
              placeholder="Select date and time"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import api from "@/modules/api";
import { ElMessage } from "element-plus";

let store = useStore();

let content = ref("");
function submit() {
  if (/^[\s\S]*.*[^\s][\s\S]*$/.test(content.value)) {
    axios.post("/feedback/" + localStorage.student, { content: content.value }).then(res => {
      if (res.data.success) {
        ElMessage.success("发布成功");
      } else {
        ElMessage.error("发布成功");
      }
    });
  }
}

let data = ref([]);
api(`select * from feedback where stu_id=` + localStorage.student).then(res => {
  data.value = res.res;
});
</script>
<style scoped lang="scss">
.box-card {
  width: 500px !important;
  height: 400px !important;
  position: fixed;
  top: 200px;
  left: calc((100vw - 500px) / 2);
  z-index: 99999;
}
</style>
