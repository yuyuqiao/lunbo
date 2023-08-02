<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '工作台']" />
    <div class=" flex">
      <div class="left-side">
        <ContentChart />
        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }">
            <Carousel />
          </a-grid-item>
        </a-grid>
      </div>
      <div class="right-side">
        <a-grid :cols="24" :row-gap="16">
          <a-grid-item class="panel" :span="24">
            <Announcement />
          </a-grid-item>
          <a-grid-item class="panel" :span="24">
            <Docs />
          </a-grid-item>
        </a-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContentChart from './components/content-chart.vue';
import Announcement from './components/announcement.vue';
import Docs from './components/docs.vue';
import Carousel from "./components/carousel.vue"
</script>
<style lang="less"  setup>
.left-side {
  flex: 1;
  overflow: auto;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}
</style>