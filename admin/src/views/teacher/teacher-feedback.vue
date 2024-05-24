<template>
  <el-card>
    <el-table :data="data" style="width: 100%">
      <el-table-column label="学生" width="260">
        <template #default="scope">
          <div>
            <div>学号:{{ scope.row.stu_data.id }}</div>
            <div>姓名:{{ scope.row.stu_data.name }}</div>
            <div>班级:{{ scope.row.stu_data.class }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="260">
        <template #default="scope">
          <el-input
            v-model="scope.row.student_content"
            style="width: 220px"
            :rows="4"
            :readonly="true"
            type="textarea"
            placeholder="反馈"
          />
        </template>
      </el-table-column>
      <el-table-column label="回复" width="260">
        <template #default="scope">
          <el-input
            v-model="scope.row.teacher_content"
            style="width: 220px"
            :rows="3"
            type="textarea"
            placeholder="反馈"
          />
          <el-button
            class="mt-2 block"
            style="width: 220px"
            type="primary"
            @click="submit(scope.row.id, scope.row.teacher_content)"
            >提交</el-button
          >
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
import { ElMessage } from "element-plus";

let store = useStore();

function submit(id, content) {
  if (/^[\s\S]*.*[^\s][\s\S]*$/.test(content)) {
    axios.put("/feedback/" + id, { content: content }).then(res => {
      if (res.data.success) {
        ElMessage.success("发布成功");
      } else {
        ElMessage.error("发布成功");
      }
    });
  }
}

let data = ref([]);
axios.get("/feedback").then(res => {
  data.value = res.data.data;
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
