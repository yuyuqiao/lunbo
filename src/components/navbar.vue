<template>
  <div class="navbar flex jb ac">
    <!-- 放置logo -->
    <div class="left-side">
      <img alt="logo" class="logo"
        src="../assets/logo.png" />
    </div>
    <!-- 个人头像 -->
    <div class="right-side">
      <a-dropdown position="bottom"  trigger="hover" auto-fit-position :unmount-on-close="false">
        <a-avatar>
          <div class="avatar">{{ avatar }}</div>
        </a-avatar>
        <template #content>
          <a-doption>
            <a-space @click="handleLogout">
              <icon-export />
              <span>
                退出登录
              </span>
            </a-space>
          </a-doption>
        </template>
      </a-dropdown>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
 const router = useRouter()
 const store = useStore()
const avatar = store.state.user?.userinfor?.dzyname?.substring(0, 1);
const handleLogout = ()=>{
      router.push("/login")
      sessionStorage.clear()
      store.commit('user/setUser', {token: ''})
}
</script>
<style scoped lang="less">
.navbar {
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}
.logo {
  width: 40px;
  height: auto;
}
.left-side {
  padding-left: 20px;
}
.avatar {
  color: #165DFF;
}
.right-side {
  padding-right: 40px;
  list-style: none;
  text-align: right;
}
</style>