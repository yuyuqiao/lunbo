<template>
    <div class="login-form-wrapper">
        <div class="login-form-box">
            <div class="login-form-title">OA后台管理系统</div>

            <div class="login-form-error-msg"></div>
            <a-form ref="loginForm" :model="userInfor" class="login-form" @submit="handleSubmit">
                <a-form-item label="用户名" field="username" :rules="[{ required: true, message: '请填写用户名' }]"
                    :validate-trigger="['change', 'blur']">
                    <a-input v-model="userInfor.username">
                        <template #prefix> <icon-user /></template></a-input></a-form-item>
                <a-form-item label="密码" field="password" :rules="[{ required: true, message: '请输入密码' }]"
                    :validate-trigger="['change', 'blur']">
                    <a-input-password v-model="userInfor.password">
                        <template #prefix> <icon-lock /></template></a-input-password></a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" long :loading="loading">
                        登录
                    </a-button>
                </a-form-item>

            </a-form>
        </div>
    </div>
</template>
<style scoped>
:deep .arco-form-item-label-required-symbol {
    display: none;
}

:deep(.arco-form-item-label-col) {
    justify-content: flex-start;
    width: 100%;
    flex: 0 0 100%;
}

:deep(.arco-form-item-wrapper-col) {
    width: 100%;
    flex: 0 0 100%;
}

.login-form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%);
}

.login-form-box {
    width: 400px;
    height: auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 16px;
}

.login-form-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 30px;
}
</style>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { db } from '@/api/index'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const userInfor = reactive({
    username: '',
    password: ""
})
const loading = ref(false)
const handleSubmit = ({
    errors,
    values,
}: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
}) => {

    if (!errors) {
        loading.value = true
        // http://113.12.81.82:10700/db   gnbh：login ，dzyid:1001 ,pwd:1222
        let query = {
            gnbh: 'login', dzyid: userInfor.username, pwd: userInfor.password
        }
        db(query).then(res => {
            sessionStorage.setItem('token', res.data[0]?.token)
            store.commit('user/setUser', res.data[0])
            setTimeout(() => {
                router.push({ name: 'storeMaskBoard' });
            }, 1000);
        }).finally(() => {
            loading.value = false
        })
    }
}
</script>