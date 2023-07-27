<template>
    <!-- 新增弹窗 -->
    <a-modal width="auto" @open="open"  title="表单名" v-model:visible="prop.isShowAddOrEdit" @ok="submitInfor" @cancel="closes">
        <div class="add-edit">
            <a-space direction="vertical" size="large" :style="{ width: '600px' }">
                <a-form :model="form" layout="vertical">
                    <a-form-item field="name" label="姓名">
                        <a-input :disabled="type=='view'" v-model="form.name"/>
                    </a-form-item>
                    <a-form-item field="email" label="邮箱">
                        <a-input :disabled="type=='view'" v-model="form.email"/>
                    </a-form-item>
                    <a-form-item field="address" label="地址">
                        <a-input :disabled="type=='view'" v-model="form.address"></a-input>
                    </a-form-item>
                    <a-form-item field="detail" label="详情">
                        <a-input :disabled="type=='view'" v-model="form.detail"></a-input>
                    </a-form-item>
                    <a-form-item field="hobby" label="爱好">
                        <a-input :disabled="type=='view'" v-model="form.hobby"></a-input>
                    </a-form-item>
                    <a-form-item field="tel" label="电话">
                        <a-input :disabled="type=='view'" v-model="form.tel"></a-input>
                    </a-form-item>
                </a-form>
            </a-space>
        </div>
    </a-modal>
</template>
<script lang="ts" setup>
import {ref } from 'vue'
const prop = defineProps({
    isShowAddOrEdit: Boolean,
    form: Object,
    type:String
}) 
const form = ref<any>({
    name: '',
      email: '',
      address: '',
      detail: '',
      hobby: '',
      tel: ''
})


const open = ()=>{
    form.value = { ...prop.form }
    console.log(prop.form,form,"数据")
}
const emit = defineEmits(['addOrEdit', 'close'])
const submitInfor = () => {
    emit('addOrEdit', form,prop.form?true: false)
}
const closes = () => {
    emit('close')
}
</script>