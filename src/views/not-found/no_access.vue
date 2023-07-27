<template>
  <a-result
    status="403"
    subtitle="当前页面无权限，请联系开发管理员开放权限！！！"
  >
  </a-result>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<style lang="less">
  :deep(.arco-result) {
   display: flex;
   justify-content: center;
   align-items: center;
  }
</style>
