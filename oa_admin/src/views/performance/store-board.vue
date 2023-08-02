<!-- 门店业绩看板 -->
<template>
    <div class="container">
        <Breadcrumb :items="['业绩看板', '门店看板']" />
        <div class="store-board">
            <!-- 搜索条件 -->
            <a-form ref="formRef" :model="form" @submit="submit">
                <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
                    <a-col :span="6">
                        <a-form-item field="busno" label="门店">
                            <a-select v-model:model-value="form.busno" :field-names="fieldNames" :options="options"
                                allow-search placeholder="请选择门店">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item field="date" label="日期">
                            <a-date-picker :allow-clear="false" style="width:100%" v-model="form.rq" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="text-align: right;">
                        <div class="a-btn">
                            <a-space>
                                <a-button long html-type="submit" type="primary">提交</a-button>
                                <!-- <a-button long @click="reset">重置</a-button> -->
                            </a-space>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
            <a-tabs v-model:active-key="tabIndex" default-active-key="1" type="card" lazy-load @tab-click="selectTab">
                <a-tab-pane key="1" title="毛利额">
                    <a-spin loading v-show="loading" style="left:50%" />
                    <MgShowData :data="mlData" v-show="!loading" />
                </a-tab-pane>
                <a-tab-pane key="2" title="销售额">
                    <a-spin loading v-show="loading" style="left:50%" />
                    <MgShowData :data="saleData" v-show="!loading" />
                </a-tab-pane>
                <a-tab-pane key="3" title="毛利率">
                    <a-spin loading v-show="loading" style="left:50%" />
                    <MgShowData :data="profitData" v-show="!loading" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { db } from '@/api/index'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import MgShowData from '@/components/show-data.vue'
const store = useStore()
const tabIndex = ref('1')
const fieldNames = { value: 'busno', label: 'orgname' }
const form = reactive<any>({
    busno: '',
    rq: dayjs().format('YYYY-MM-DD')
})
const loading = ref(false)
const formRef = ref()
const options = ref([{ busno: '', orgname: "全部" }])
// 毛利额
const mlData = reactive(
    [{
        key: 'ml_dcl', title: '毛利额达成率', isPercent: true, number: '', isHundred: true
    }, {
        key: 'keliu', title: '交易笔数', isPercent: false, number: '', isHundred: false
    }, {
        key: 'keliu_tb', title: '交易笔数同比增长率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'kedan', title: '客单价', isPercent: false, number: '', isHundred: false
    }, {
        key: 'kedan_tb', title: '客单价同比增长率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'mll', title: '毛利率', isPercent: false, number: '', isHundred: false
    }, {
        key: 'mll_tb', title: '毛利率同比增长率', isPercent: true, number: '', isHundred: false
    }]
) // 销售额
const saleData = reactive(
    [{
        key: 'sshje_dcl', title: '销售额达成率', isPercent: true, number: '', isHundred: true
    }, {
        key: 'keliu', title: '交易笔数', isPercent: false, number: '', isHundred: false
    }, {
        key: 'keliu_tb', title: '交易笔数同比增长率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'kedan', title: '客单价', isPercent: false, number: '', isHundred: false
    }, {
        key: 'kedan_tb', title: '客单价同比增长率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_ypdkl_zb', title: '一品单客流占比', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_ypdkl_zb', title: '一品单客流占比同比增长率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_yxpz_zb', title: '营销品种占比', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_yxpz_zb_tb', title: '营销品种占比同比增长率', isPercent: true, number: '', isHundred: false
    }]
) 
// 毛利率
const profitData = reactive(
    [{
        key: 'sshje_dcl', title: '毛利率达成率', isPercent: true, number: '', isHundred: true
    }, {
        key: 'kedan', title: '客单价', isPercent: false, number: '', isHundred: false
    }, {
        key: 'kedan_tb', title: '客单价同比增长率', isPercent: true, number: '', isHundred: false
    },  {
        key: 'keliu', title: '毛利率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'keliu_tb', title: '毛利率同比增长率', isPercent: true, number: '', isHundred: false
    },{
        key: 'sshje_ypdkl_zb', title: '换购销售额占比', isPercent: true, number: '', isHundred: false
    },{
        key: 'sshje_ypdkl_zb', title: '换购销售额占比同比增长率', isPercent: true, number: '', isHundred: false
    },  {
        key: 'sshje_ypdkl_zb', title: '普药毛利率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_yxpz_zb', title: '普药毛利率同比增长率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_yxpz_zb_tb', title: '营销品种毛利率', isPercent: true, number: '', isHundred: false
    }, {
        key: 'sshje_yxpz_zb_tb', title: '营销品种毛利率同比增长率', isPercent: true, number: '', isHundred: false
    }]
) 
const submit = () => {
    selectTab()
}
const selectTab = () => {
    if (tabIndex.value == '1') form.busno ? getMLEData('get.org.jyzk_ml') : getMLEData('get.org.jyzk_ml_all')
    if (tabIndex.value == '2') form.busno ? getSaleData('get.org.jyzk_sshje') : getSaleData('get.org.jyzk_sshje_all')
    if (tabIndex.value == '3') form.busno ? getProfitData('get.org.jyzk_mll') : getProfitData('get.org.jyzk_mll_all')
}
// 获取门店数据
const getMDData = () => {
    db({
        gnbh: "get.my.org",
        token: store.state.user?.userinfor?.token,
        erpid: store.state.user?.userinfor?.erpid,
        key: null
    }).then(res => {
        options.value = [...options.value, ...res.data]
    })

}
const getQueryData = (datas: any, list: any) => {
    for (let i in datas) {
        list.forEach((item: any) => {
            if (item.key == i) {
                item.number = datas[i]
            }
        });
    }
}
// 获取毛利额数据
const getMLEData = (gnbh: String) => {
    let query = {
        rq: form.rq, busno: form.busno ? form.busno : null,
        erpid: store.state.user?.userinfor?.erpid,
        token: store.state.user?.userinfor?.token,
        gnbh: gnbh,
    }
    loading.value = true
    db(query).then(res => {
        getQueryData(res.data[0],mlData)
    }).finally(() => { loading.value = false })
}
// 获取销售额数据
const getSaleData = (gnbh: String) => {
    let query = {
        rq: form.rq, busno: form.busno ? form.busno : null,
        erpid: store.state.user?.userinfor?.erpid,
        token: store.state.user?.userinfor?.token,
        gnbh: gnbh
    }
    loading.value = true
    db(query).then(res => {
        getQueryData(res.data[0],saleData)
    }).finally(() => { loading.value = false })
}
// 获取毛利率数据
const getProfitData = (gnbh: String) => {
    let query = {
        rq: form.rq, busno: form.busno ? form.busno : null,
        erpid: store.state.user?.userinfor?.erpid,
        token: store.state.user?.userinfor?.token,
        gnbh: gnbh
    }
    loading.value = true
    db(query).then(res => {
        getQueryData(res.data[0],profitData)
    }).finally(() => { loading.value = false })
}
onMounted(() => {
    getMDData()
    getMLEData('get.org.jyzk_ml_all')
})
</script>
<style lang="less" scoped>

:deep(.arco-form-item-label-col) {
    justify-content: flex-start;
    width: 20%;
    flex: 0 0 20%;
}

:deep(.arco-form-item-wrapper-col) {
    width: 80%;
    flex: 0 0 80%;
}

:deep(.arco-tabs-nav-type-card .arco-tabs-tab),
:deep(.arco-tabs-nav-type-card-gutter .arco-tabs-tab) {
    padding: 7px 50px;
}

.store-board {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
}

.arco-tabs-content {
    padding: 20px;
}

</style>