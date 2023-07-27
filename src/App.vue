<template>
  <a-config-provider :locale="locale">
    <router-view  v-wechat-title="$route.meta.title" />
  </a-config-provider>
</template>



<script lang="ts" setup>
  import {  ref } from 'vue';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  const locale = ref(zhCN)
</script>
