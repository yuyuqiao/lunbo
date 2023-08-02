<template>
    <!-- 搜索页面 -->
    <div>
        <a-form ref="formRef" :model="form" @submit="submit">
            <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
                <a-col :span="6">
                    <a-form-item field="id" label="id">
                        <a-input v-model="form.id" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item field="name" label="姓名">
                        <a-input v-model="form.name" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item field="date" label="日期">
                        <a-date-picker v-model="form.date" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                <a-form-item
                  field="email"
                  label="邮箱"
                >
                <a-input v-model="form.email" />
                </a-form-item>
              </a-col>
                <a-col :span="24">
                    <div class="a-btn">
                        <a-space>
                            <a-button long html-type="submit" type="primary">提交</a-button>
                            <a-button long @click="formRef.resetFields()">重置</a-button>
                        </a-space>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
const form = reactive({
    name: '',
    id: '',
    date: '',
    email: ''
})
const formRef = ref()
const emit = defineEmits(['search'])
const submit = () => {
        emit('search',form)
}
</script>
<style lang="less" scoped>
.a-btn {
    text-align: right;
}
:deep(.arco-form-item-label-col) {
    justify-content: flex-start;
    width: 20%;
    flex: 0 0 20%;
}
:deep(.arco-form-item-wrapper-col){
    width: 80%;
    flex: 0 0 80%;
}
</style>