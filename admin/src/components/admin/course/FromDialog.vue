<template>
  <el-dialog
    @close="close()"
    v-model="props.visible"
    :title="props.title"
    destroy-on-close
    width="600"
  >
    <!-- 表单 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" style="max-width: 500px">
      <el-form-item label="课程姓名" prop="name">
        <el-input v-model="form.name" style="width: 260px" />
      </el-form-item>
      <el-form-item label="课程学分" prop="credit">
        <el-input-number v-model="form.credit" :min="1" :max="20" />
      </el-form-item>
      <el-form-item label="课程满分" prop="total_score">
        <el-input-number v-model="form.total_score" :min="1" :max="150" />
      </el-form-item>
      <el-form-item label="学期" prop="semester">
        <el-input-number v-model="form.semester" :min="1" :max="12" />
      </el-form-item>
      <el-form-item label="所属专业" prop="major_id">
        <el-select v-model="form.major_id" placeholder="选择专业" style="width: 260px">
          <el-option
            v-for="item in data?.data?.list"
            :key="item.major_id"
            :label="item.college_name + ': ' + item.major_name"
            :value="item.major_id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <template #footer>
      <div>
        <el-button @click="emits('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import useFetch from "@/hooks/useFetch";
import axios from "axios";

let props = defineProps(["initValue", "title", "visible"]);
let emits = defineEmits(["update:visible", "close"]);

let form = reactive({
  name: "",
  credit: 2,
  total_score: 100,
  major_id: "",
  semester: 2,
});

let stop = watchEffect(() => {
  if (props.initValue) {
    let value = props.initValue;
    delete value["id"];
    delete value["major_name"];
    value.major_id = value.major;
    delete value["major"];
    form = value;
    stop();
  }
});

const rules = {
  // 课程姓名的验证
  name: [
    { required: true, message: "请输入课程姓名", trigger: "change" },
    { min: 2, max: 20, message: "课程姓名长度应在 2 到 20 个字符之间", trigger: "change" },
  ],

  // 课程学分的验证
  credit: [
    { required: true, message: "请输入课程学分", trigger: "blur" },
    { type: "number", message: "学分必须是一个正整数", trigger: "blur" },
    { type: "number", min: 1, max: 100, message: "课程学分应在 1 到 100 之间", trigger: "blur" },
  ],

  // 课程满分的验证
  total_score: [
    { required: true, message: "请输入课程满分", trigger: "blur" },
    { type: "number", message: "满分必须是一个正整数", trigger: "blur" },
    { type: "number", min: 1, max: 100, message: "课程满分应在 1 到 100 之间", trigger: "blur" },
  ],

  // 学期的验证
  semester: [
    { required: true, message: "请输入学期", trigger: "blur" },
    { type: "number", message: "学期必须是一个正整数", trigger: "blur" },
    { type: "number", min: 1, max: 12, message: "学期应在 1 到 12 之间", trigger: "blur" },
  ],
  // 所属专业的验证
  major_id: [{ required: true, message: "请选择所属专业", trigger: "change" }],
};

const formRef = ref(null);

let { data } = useFetch(() => axios.get(`/major`));

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    emits("submit", { ...form });
  } catch (error) {
    console.log("表单验证失败:", error);
  }
};

function close() {
  emits("update:visible", false);
  props.close && props.close && props.close();
}
</script>

<style scoped lang="scss"></style>
