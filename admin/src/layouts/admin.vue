<template>
  <div class="fixed top-0 left-0">
    <AdminNavigate v-if="auth == 'admin'" />
    <StudentNavigate v-else-if="auth == 'student'" />
    <TeacherNavigate v-else />
  </div>
  <div class="m-2">
    <div v-if="isLoading">
      <el-skeleton :rows="5" />
      <el-skeleton :rows="5" />
    </div>
    <RouterView v-else />
  </div>
</template>
<script setup>
import AdminNavigate from "@/components/admin/Navigate";
import StudentNavigate from "@/components/student/Navigate";
import TeacherNavigate from "@/components/teacher/Navigate";

import { onMounted, onUnmounted, watchEffect } from "vue";
import { useUserData } from "@/store/useUserData";
import { useRouter } from "vue-router";
import axios from "axios";

let store = useUserData();
let router = useRouter();
let isLoading = ref(false);

let hash = window.location.hash.split("/")[1];
let keys = ["admin", "student", "teacher"];
let auth = keys.find(item => item == hash);

watchEffect(() => {
  if (store.userData == false) {
    router.replace("/sign");
  }
});

if (!store.userData) {
  isLoading.value = true;

  axios
    .get("/info")
    .then(res => {
      if (res.data.success && res.data.data.auth == auth) {
        isLoading.value = false;
        store.set(res.data.data);
      } else {
        store.set(false);
      }
    })
    .catch(err => {
      store.set(false);
    });
}

onMounted(() => {
  document.body.classList.add("pl-52");
});
onUnmounted(() => {
  document.body.classList.remove("pl-52");
});
</script>
