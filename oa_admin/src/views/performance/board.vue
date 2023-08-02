<!-- 门店业绩看板 -->
<template>
    <div class="container">
        <Breadcrumb :items="['业绩看板', '门店经营状况']" />
        <div class="store-board">
            <a-tabs v-model:active-key="tabIndex" default-active-key="1" type="card" :destroy-on-hide="true" :lazy-load="true">
                 <a-tab-pane key="1" title="日">
                   <!-- 日 -->
                   <MgDayModule />
                </a-tab-pane>
                <a-tab-pane key="2" title="月">
                    <!-- 月 -->
                    <!-- <div class="text">正在努力开发中...</div> -->
                    <MgMonthModule />
                </a-tab-pane>
                <a-tab-pane key="3" title="年">
                    <MgYearModule />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script lang="ts" setup>
import MgDayModule  from "./components/day-module.vue";
import MgMonthModule  from "./components/month-module.vue";
import MgYearModule  from "./components/year-module.vue";
import { ref} from "vue";
const tabIndex = ref('1')
</script>
<style lang="less" scoped>
:deep(.arco-tabs-nav-type-card .arco-tabs-tab),
:deep(.arco-tabs-nav-type-card-gutter .arco-tabs-tab) {
    padding: 7px 50px;
}
.store-board {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
}
.text {
    text-align: center;
    padding: 30px 0;
}
</style>