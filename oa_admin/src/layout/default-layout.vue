<template>
  <a-layout class="layout" >
    <!-- 导航栏 -->
    <div class="layout-navbar">
      <Narbar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider style="width:220px;padding-top:60px;"
          class="layout-sider"
          breakpoint="xl"
          :collapsible="true"
          :hide-trigger="true"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-layout class="layout-content">
          <a-layout-content style="padding-left:220px;padding-top: 60px;">
            <!-- 内容 -->
            <router-view />
          </a-layout-content>
          <!-- 底部 -->
          <Footer />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import Narbar from "@/components/navbar.vue"
import Footer from "@/components/footer.vue"
import Menu from "@/components/menu/index.vue"
</script>
<style lang="less" scoped>
  @nav-size-height: 60px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    :deep(.arco-menu) {
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
        background-color: var(--color-text-4);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }

  .layout-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>
