<template>
  <el-card>
    <div v-if="isLoading"><el-skeleton :rows="5" /> <el-skeleton :rows="5" class="mt-4" /></div>
    <el-table v-else :data="data?.data || []" style="width: 100%">
      <el-table-column label="标题" width="200">
        <template #default="socpe">
          <el-popover placement="top-start" :width="200" trigger="hover" :content="socpe.row.title">
            <template #reference>
              <div class="truncate">
                {{ socpe.row.title }}
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="260">
        <template #default="socpe">
          <el-popover placement="top-start" :width="400" trigger="hover" :content="socpe.row.title">
            <template #reference>
              <div
                @click="
                  content = socpe.row.content;
                  visible = true;
                "
                class="cursor-pointer"
              >
                点击查看
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="260">
        <template #default="socpe">
          <el-date-picker
            v-model="socpe.row.create_time"
            readonly
            type="datetime"
            placeholder="Select date and time"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否置顶">
        <template #default="socpe">
          <div class="font-bold">
            <div class="text-red-700" v-if="socpe.row.isTop">是</div>
            <div class="text-blue-700" v-else>否</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      class="flex justify-center mt-4"
      background
      layout="prev, pager, next"
      :total="data?.pagination?.total"
    />
  </el-card>
  <el-dialog v-model="visible" title="公告" width="600">
    <div v-html="content"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="content = null"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";

let page = ref(1);
let { data, isLoading } = useFetch(() => axios.get("/notice", { params: { page: page.value } }), {
  deps: [page.value],
});

watchEffect(() => {
  if (data.value?.data) {
    let ids = data.value?.data?.filter(item => !item.isRead)?.map(item => item.id);
    if (ids?.length) {
      axios.post("/notice/read", { notice_ids: ids }).then(res => {
        if (!res.data.success) {
          ElMessage.error(res.data.message);
        }
      });
    }
  }
});

let visible = ref(false);
let content = ref(null);
let router = useRouter();
</script>
<style scoped lang="scss"></style>
