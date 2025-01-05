<template>
  <el-dialog
    @close="close()"
    v-model="props.visible"
    :title="props.title"
    destroy-on-close
    width="700"
  >
    <!-- 表单 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" style="max-width: 500px">
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="教师年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="110" />
      </el-form-item>
      <el-form-item label="教师性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属学院" prop="college_id">
        <el-select
          @change="collegeChange"
          v-model="form.college_id"
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
      </el-form-item>
      <el-form-item label="教授学科" prop="course_data">
        <div
          v-if="collegeCourseData[form.college_id]"
          v-for="(item, index) in form.course_data"
          :key="index"
          class="flex items-start"
          :class="index && 'mt-1'"
        >
          <el-select
            filterable
            v-model="form.course_data[index].course_id"
            placeholder="选择课程"
            style="width: 200px"
            @change="e => changeCourse(e, true)"
          >
            <el-option
              v-for="item in collegeCourseData[form.college_id]"
              :key="item.course_id"
              :label="item.major_name + ':' + item.course_name"
              :value="item.course_id"
            />
          </el-select>
          <el-select
            class="ml-2"
            v-if="courseClassData[form.course_data[index].course_id]"
            v-model="form.course_data[index].class_id"
            placeholder="选择班级"
            style="width: 280px"
            multiple
            filterable
          >
            <el-option
              v-for="item in courseClassData[form.course_data[index].course_id]"
              :key="item.id"
              :label="`${item.major_name} (${item.class_index})班`"
              :value="item.id"
            />
          </el-select>
          <div class="flex items-center">
            <el-button
              type="primary"
              :icon="Plus"
              circle
              class="ml-1"
              @click="add()"
              v-if="form.course_data.length - 1 == index"
            />
            <el-button v-if="index != 0" type="danger" :icon="Minus" circle @click="less(index)" />
          </div>
        </div>
        <div v-else>该学院下没有设置课程。</div>
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

import { Plus, Minus } from "@element-plus/icons-vue";

let props = defineProps(["initValue", "title", "visible"]);
let emits = defineEmits(["update:visible", "close"]);

let form = reactive({
  name: "",
  age: 20,
  sex: "男", // 默认选择男
  college_id: "",
  course_data: [{ course_id: "", class_id: [] }],
});

// 设置默认值
let stop = watchEffect(() => {
  if (props.initValue) {
    let value = props.initValue;
    form.name = value.name;
    form.age = value.age;
    form.sex = value.sex;
    form.college_id = value.college_id;
    form.course_data = value.course_data;
    form.course_data.forEach(item => {
      changeCourse(item.course_id);
    });
    stop();
  }
});

const rules = {
  name: [
    { required: true, message: "请输入教师姓名", trigger: "change" },
    { min: 2, max: 20, message: "教师姓名长度应在 2 到 20 个字符之间", trigger: "change" },
  ],
  sex: [{ required: true, message: "请选择教师性别", trigger: "change" }],
  college_id: [{ required: true, message: "请选择所属学院", trigger: "change" }],
};

const formRef = ref(null);
let collegeCourseData = ref({}); //学院=>专业课
let courseClassData = ref({}); //专业课=>班级

let { data: collegeData, isLoading: collegeIsLoading } = useFetch(() => axios.get("/college"));
// 根据学院获取课程列表
watchEffect(() => {
  if (form.college_id) {
    axios.get("/course-by-college/" + form.college_id).then(res => {
      if (!res.data.success) {
        ElMessage.warning(res.data.message);
      } else {
        collegeCourseData.value[form.college_id] = res.data.data;
      }
    });
  }
});

// 选择课程后查询可以授课的班级
function changeCourse(id, isClear) {
  axios.get("/course-by-class/" + id).then(res => {
    if (isClear) {
      form.course_data.find(item => item.course_id == id).class_id = [];
    }
    courseClassData.value[id] = res.data.data;
    if (!res.data.success) {
      ElMessage.warning(res.data.message);
    }
  });
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    emits("submit", { ...form });
  } catch (error) {
    console.log("表单验证失败:", error);
  }
};

// 添加专业选择器和删除专业选择器
function add() {
  form.course_data.push({ course_id: "", class_id: [] });
}

function less(index) {
  form.course_data.splice(index, 1);
}

function close() {
  emits("update:visible", false);
  props.close && props.close && props.close();
}

// 学院更新 删除以及选择的专业 课程
function collegeChange() {
  form.course_data = [{ course_id: "", class_id: [] }];
}
</script>

<style scoped lang="scss"></style>
