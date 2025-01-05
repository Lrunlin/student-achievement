import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserData = defineStore("user-data", () => {
  const userData = ref(null);
  function set(val) {
    userData.value = val;
  }
  return { userData, set };
});
