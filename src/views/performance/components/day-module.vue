<!--日 开始日期 结束日期 -->
<template>
    <div class="content_day">
        <div class="search_list">
            <a-form ref="formRef" :model="form" @submit="submit">
                <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
                    <a-col :span="12">
                        <a-form-item field="busno" label="日期">
                            <a-range-picker :allow-clear="false" style="width: 100%;" v-model="form.date"
                                format="YYYY-MM-DD" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item field="date" label="同比日期">
                            <a-range-picker :allow-clear="false" style="width: 100%;" v-model="form.tb_date"
                                format="YYYY-MM-DD" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item field="all" label="门店">
                            <a-cascader style="width: 100%;" v-model="form.all" @change="change" :field-names="fieldNames"
                                allow-search :options="options" placeholder="请选择" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" style="text-align: right;">
                        <div class="a-btn">
                            <a-space>
                                <a-button long html-type="submit" type="primary">提交</a-button>
                            </a-space>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div class="list_content">
            <a-spin loading v-show="loading" style="left:50%" />
            <div v-show="!loading" style="margin-top: 20px;">
                <MgShowData :data="data">
                    <template v-slot:two='user'>
                        <div class="tip">
                            <p>{{ user.user.practice1 ? user.user.practice1 : '--' }}</p>
                            <p>{{ user.user.practice2 }}</p>
                        </div>
                    </template>
                </MgShowData>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from "vuex";
import { db } from "@/api/index";
import dayjs from 'dayjs'
import MgShowData from '@/components/show-data.vue'
let store = useStore()
const form = reactive<any>({
    busno: '',
    date: [new Date(), new Date()],
    tb_date: [new Date(), new Date()],
    orgname: '',
    all: '全部'
})
const loading = ref(false)
const fieldNames = { value: 'busno', label: 'orgname' }
const options = ref<any>([])
// 定义接收字段
const data = reactive([{
    key: 'ml_dcl', title: '日清毛利额达成率（考核）', isPercent: true, number: '', isHundred: true, practice1: '', practice2: '', isShow: true
}, 
{
    key: 'ml', title: '毛利额', isPercent: false, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
},
{
    key: 'keliu', title: '当天客流', isPercent: false, number: '', isHundred: false, isShow: true
}, {
    key: 'kedan', title: '当天客单', isPercent: false, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
},{
    key: 'sshje_dcl', title: '日清销售额达成率（考核）', isPercent: true, number: '', isHundred: true, shouTipData: 'ssjh', practice1: '', practice2: '', isShow: true
},
{
    key: 'xse', title: '销售额', isPercent: false, number: '', isHundred: false, shouTipData: '', isShow: true
},

 {
    key: 'mll', title: '毛利率', isPercent: true, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
}, 
 {
    key: 'yxpz_mll', title: '营销品种毛利率', isPercent: true, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
},
 {
    key: 'puyao_mll', title: '普药毛利率', isPercent: true, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
},
{
    key: 'cxrkedan', title: '促销日客单价', isPercent: false, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
},
{
    key: 'ypdkeliu_zb', title: '一品单客流占比', isPercent: true, number: '', isHundred: false, shouTipData: '', practice1: '', isShow: true
}, 
])
// 获取门店数据
const getMDData = () => {
    db({
        gnbh: "pc_huoqupqmd",
        dzyid: store.state.user?.userinfor?.dzyid,
        orgid: store.state.user?.userinfor?.orgid,
        busno: store.state.user?.userinfor?.busno,
        token: store.state.user?.userinfor?.token,
        erpid: store.state.user?.userinfor?.erpid
    }).then(res => {
        let pq_arr = [{ busno: '-1', orgname: '全部' }]
        res.data.forEach((item: any) => {
            let md_arr = [{ busno: item.orgname, orgname: '全部' }]
            item.subordinate.forEach((n: any) => {
                md_arr.push(n)
            });

            let obj = {
                busno: item.orgname,
                orgname: item.orgname,
                children: md_arr
            }
            pq_arr.push(obj)
        });
        options.value = [...pq_arr]
    })

}
// 获取列表数据
const getListsData = () => {
    loading.value = true
    db({
        gnbh: "pc_jyzk",
        dzyid: store.state.user?.userinfor?.dzyid,
        orgid: store.state.user?.userinfor?.orgid,
        token: store.state.user?.userinfor?.token,
        erpid: store.state.user?.userinfor?.erpid,
        startTime: dayjs(form.date[0]).format('YYYY-MM-DD'), endTIme: dayjs(form.date[1]).format('YYYY-MM-DD'),
        tbstartTime: dayjs(form.tb_date[0]).format('YYYY-MM-DD'), tbendTIme: dayjs(form.tb_date[1]).format('YYYY-MM-DD'),
        orgname: form.orgname,
        busno: form.busno,
    }).then(res => {
        let datas = res.data
        for (let i in datas) {
            data.forEach((n: any) => {
                if (n.key == i) {
                    if (n.key === 'ml_dcl') {
                        n.practice1 =datas.rw_ml? `任务毛利额：${datas.rw_ml}`:'--'
                    }
                    if (n.key === 'ml') {
                        n.practice1 = datas.jdyoyml?`同比：${datas.jdyoyml}%`:'--'
                    }
                    if (n.key === 'sshje_dcl') {
                        n.practice1 = datas.rw_xse?`任务销售额：${datas.rw_xse}`: '--'
                    }
                    if (n.key === 'xse') {
                        n.practice1 = `同比：${datas.jdyoysshje}%`
                        n.practice2 = datas.hg_sshje_zb?`换购销售额占比：${datas.hg_sshje_zb}%`:'--'
                    }
                    if (n.key === 'keliu') {
                        n.practice1 = datas.keliutb?`同比：${datas.keliutb}%`: '--'
                    }
                    if (n.key === 'kedan') {
                        n.practice1 = datas.kedantb?`当天客单同比：${datas.kedantb}%`: '--'
                        n.practice2 = datas.jdyoykedan?`客单同比：${datas.jdyoykedan}%`: '--'
                    }
                    if (n.key === 'mll') {
                        n.practice1 = datas.yoymll?`同比：${datas.yoymll}%`: '--'
                    }
                    if (n.key === 'yxpz_mll') {
                        n.practice1 = datas.yxpzsshje_zb?`占比：${datas.yxpzsshje_zb}%`: '--'
                    }
                    n.number = datas[i]
                }
            });
        }
    }).finally(() => {
        loading.value = false
    })
}
// 判断是门店还是片区
const change = (val: any) => {
    form.orgname = form.busno = ''
    if (val == '-1') return
    let pattern = new RegExp("[\u4E00-\u9FA5]+");
    if (pattern.test(val)) {
        form.orgname = val
    } else {
        form.busno = val
    }

}
// 提交信息
const submit = () => {
    getListsData()
}
onMounted(() => {
    getMDData()
    getListsData()
})
</script>
<style lang="less" scoped>
@import './day_month.less';

.tip p {
    margin: 0;
}
</style>