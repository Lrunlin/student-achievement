<template>
  <el-dialog
    @close="close()"
    v-model="props.visible"
    :title="props.title"
    destroy-on-close
    width="700"
  >
    <!-- 表单 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="学生年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="110" />
      </el-form-item>
      <el-form-item label="学生性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="class_id" label="所属班级" class="flex">
        <el-select
          clearable
          filterable
          v-model="college_id"
          placeholder="选择学院"
          style="width: 160px"
        >
          <el-option
            v-for="item in data?.data"
            :key="item.college_id"
            :label="item.college_name"
            :value="item.college_id"
          />
        </el-select>
        <el-select
          clearable
          filterable
          v-model="form.major_id"
          placeholder="选择专业"
          style="width: 160px"
          class="mx-4"
        >
          <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select
          clearable
          filterable
          v-model="form.class_id"
          placeholder="选择班级"
          style="width: 160px"
        >
          <el-option
            v-for="item in classList"
            :key="item.class_id"
            :label="getClassName(item.class_index)"
            :value="item.class_id"
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
import { ElMessage } from "element-plus";

let props = defineProps(["initValue", "title", "visible"]);
let emits = defineEmits(["update:visible", "close"]);

let form = reactive({
  name: "",
  age: 20,
  sex: "男", // 默认选择男
  major_id: "",
  class_id: "",
});

// 设置默认值
let stop = watchEffect(() => {
  if (props.initValue) {
    let value = props.initValue;
    form.name = value.name;
    form.age = value.age;
    form.sex = value.sex;
    form.major_id = value.major_id;
    form.class_id = value.class_id;
    stop();
  }
});

const rules = {
  name: [
    { required: true, message: "请输入学生姓名", trigger: "change" },
    { min: 2, max: 20, message: "学生姓名长度应在 2 到 20 个字符之间", trigger: "change" },
  ],
  sex: [{ required: true, message: "请选择学生性别", trigger: "change" }],
  class_id: [{ required: true, message: "请选择所属班级", trigger: "change" }],
};

const formRef = ref(null);

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    emits("submit", { ...form });
  } catch (error) {
    console.log("表单验证失败:", error);
  }
};

// 查询列表
let { data, isLoading, refetch } = useFetch(() => axios.get(`/tree/college-major-class`));

let class_id = computed(() => form.class_id);
watch(class_id, newValue => {
  // 在获取到class_id时设置学院ID
  if (newValue && !college_id.value) {
    college_id.value = data.value?.data?.find(item =>
      item.major_data.some(item => item.id == form.major_id)
    ).college_id;
  }
});
let college_id = ref("");
let majorList = computed(
  () => data.value?.data?.find(item => item.college_id == college_id.value)?.major_data
);
let classList = computed(
  () => majorList.value?.find(item => item.id == form.major_id)?.class_data || []
);

function getClassName(class_index) {
  return majorList.value?.find(item => item.id == form.major_id).name + `(${class_index}) 班`;
}

function close() {
  emits("update:visible", false);
  props.close && props.close && props.close();
}
</script>

<style scoped lang="scss"></style>
