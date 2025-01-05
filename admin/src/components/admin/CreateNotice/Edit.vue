<template>
  <div style="border: 1px solid #ccc; z-index: 99; width: 100%">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="onChange"
    />
  </div>
</template>
<script setup>
import { onBeforeUnmount, ref, shallowRef, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import axios from "axios";
import { ElMessage } from "element-plus";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

let props = defineProps(["initValue"]);
let emit = defineEmits(["onSubmit"]);
let stop = watchEffect(() => {
  if (props.initValue) {
    valueHtml.value = props.initValue;
    setTimeout(() => {
      editorRef.value.move(props.initValue.length + 1);
      stop();
    }, 0);
  }
});

const toolbarConfig = {
  excludeKeys: ["group-video"],
};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      maxFileSize: 50 * 1024 * 1024, // 50M
      maxNumberOfFiles: 1,
      allowedFileTypes: ["image/*"],
      async customUpload(file, insertFn) {
        let form = new FormData();
        form.append("image", file);
        axios
          .post("/static", form)
          .then(res => {
            if (res.data.success) {
              insertFn(axios.defaults.baseURL + "/image/" + res.data.data, "IMAGE", undefined);
            } else {
              ElMessage.error(res.data.message);
            }
          })
          .catch(() => {
            ElMessage.error("上传错误");
          });
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor;
};

let first = ref(true);
function onChange(el) {
  if (!first.value) {
    emit("onSubmit", el.isEmpty() ? "" : el.getHtml());
  } else {
    first.value = false;
  }
}
let mode = "default";
</script>
<style lang="scss">
.w-e-image-container {
  max-width: 80% !important;
  img {
    max-width: 80% !important;
  }
}
</style>
