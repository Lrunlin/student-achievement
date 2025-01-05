<template></template>
<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
router.replace("/admin");
</script>
<style scoped lang="scss"></style>
