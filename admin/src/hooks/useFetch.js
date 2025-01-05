import { ref, watch } from "vue";
import axios from "axios";

function useFetch(axiosFun, options = { manual: false, deps: [] }) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  // 定义 fetchData 方法，用于发起请求
  const fetchData = async () => {
    isLoading.value = true;

    try {
      const response = await axiosFun();
      if (options.callback) {
        data.value = options.callback(response.data) || response.data;
      } else {
        data.value = response.data;
      }
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  // 如果 manual 为 false，自动触发请求
  if (!options.manual) {
    // 如果 deps 数组为空，立即触发请求
    if (options?.deps == undefined || options?.deps?.length === 0) {
      fetchData(); // 立即发起请求
    } else {
      // 监控 deps 中的 ref 变量变化，触发请求
      watch(
        options.deps,
        () => {
          fetchData();
        },
        { immediate: true }
      ); // immediate: true 让第一次就触发请求
    }
  }

  // 如果 manual 为 true，返回一个手动触发请求的方法
  const refetch = () => {
    fetchData();
  };

  return {
    data,
    error,
    isLoading,
    refetch, // 仅在 manual 为 true 时需要手动触发请求
  };
}

export default useFetch;
