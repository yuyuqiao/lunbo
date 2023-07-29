<!-- 个人 -->
<template>
    <div class="container">
        <Breadcrumb :items="['业绩看板', '门店经营状况']" />
        <div class=" store-board">
            <div class="content_day">
                <div class="search_list">
                    <a-form ref="formRef" :model="form">
                        <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
                            <a-col :span="4">
                                <a-form-item field="busno" label="月份">
                                    <a-month-picker style="width: 100%;" :defaultValue="defaultMoonth" placeholder="请选择月份"
                                        v-model="form.month" />
                                </a-form-item>
                            </a-col>

                            <a-col :span="20" style="text-align: right;">
                                <div class="a-btn">
                                    <a-space>
                                        <a-button long html-type="getAllToker" type="primary">查询</a-button>
                                    </a-space>
                                </div>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <div class="list_content">
                    <a-spin loading v-show="loading" style="left:50%" />
                    <div v-show="!loading">
                        <MgShowData :data="data">
                            <template v-slot:two='user'>
                                <div class="tip">
                                    <p>{{ user.user.practice1 }}</p>
                                    <p>{{ user.user.practice2 }}</p>
                                </div>
                            </template>
                        </MgShowData>
                    </div>
                </div>
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
    orgname: '',
    all: '全部',
    leibie: '按个人',
    month: dayjs().format('YYYY-MM')
})
const defaultMoonth = dayjs().format('YYYY-MM')
const loading = ref(false)
const fieldNames = { value: 'busno', label: 'orgname' }
const options = ref<any>([])

const data = reactive(
    [
        {
            key: 'zongxse', title: '总销售额', isPercent: false, number: '', isHundred: true, practice1: '', practice2: '', isShow: true
        }, {
            key: 'grkeliu', title: '个人交易笔数', isPercent: false, number: '', isHundred: false, practice1: '', practice2: '', isShow: true
        }, {
            key: 'yxxse', title: '营销销售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'bjpxse', title: '保健品售额', isPercent: false, number: '', isHundred: false, isShow: true
        }, {
            key: 'zyypxse', title: '中药饮片售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'yszyxse', title: '中药养生售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'puyaoxse', title: '普药销售额', isPercent: false, number: '', isHundred: false, practice1: '', practice2: '', isShow: true
        }, {
            key: 'ypdkeliu', title: '一品单交易数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'hgxse', title: '换购销售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true

        }, {
            key: 'hgkeliu', title: '换购交易笔数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'shl_vip', title: '门店拓客总数量', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zongkeliu', title: '总来客数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zonghyfugourenshu', title: '总会员复购人数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zonghykedan', title: '总会员客单价', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zonghyxse', title: '总会员销售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }
    ])
// 获取拓客信息
const getTokerData = () => {
    reset()
    loading.value = true
    db({
        gnbh: 'get.org.shujucenter_yuefen_oa',
        dzyid: store.state.user?.userinfor?.dzyid,
        orgid: store.state.user?.userinfor?.orgid,
        token: store.state.user?.userinfor?.token,
        erpid: store.state.user?.userinfor?.erpid,
        yuefen: dayjs(form.month).format('YYYY-MM'),
        orgname: form.orgname,
        busno: form.busno,
        leibie: form.leibie
    }).then(res => {
        let datas = res.data ? res.data[0] : {}
        for (let i in datas) {
            data.forEach((n: any) => {
                if (n.key == i) {
                    if (n.key === 'zonghyfugourenshu') {
                        // 总会员复购人数
                        n.practice1 = datas.zonghyfugou_lv ? `复购率：${datas.zonghyfugou_lv}%` : '--'
                    }
                    if (n.key == 'shl_vip') {
                        // 门店拓客总数量
                        n.practice1 = datas.shl_youxiaovip ? `有效数量：${datas.shl_youxiaovip}` : '--'
                    }
                    if (n.key == 'zongkeliu') {
                        // 总来客数
                        n.practice1 = datas.zonghykeliu ? `会员来客数：${datas.zonghykeliu}` : '--'
                    }

                    if (n.key === 'hgxse') {
                        // 换购销售额
                        n.practice1 = datas.hgxs_zb ? `占比：${datas.hgxs_zb}%` : '--'
                    }
                    if (n.key === 'hgkeliu') {
                        // 换购交易笔数
                        n.practice1 = datas.hg_zhl ? `转换率：${datas.hg_zhl}%` : '--'
                    }
                    if (n.key === 'yxxse') {
                        // 营销销售额
                        n.practice1 = datas.yxxs_zb ? `占比：${datas.yxxs_zb}%` : '--'
                        n.practice2 = datas.yxkeliu ? `交易笔数：${datas.yxkeliu}` : '--'
                    }
                    if (n.key === 'puyaoxse') {
                        // 普药销售额
                        n.practice1 = datas.puyaoxse_zb ? `占比：${datas.puyaoxse_zb}%` : '--'
                        n.practice2 = datas.puyaokeliu ? `交易笔数：${datas.puyaokeliu}` : '--'
                    }
                    if (n.key == 'zonghyxse') n.practice1 = datas.zonghyxse_zb ? `占比：${datas.zonghyxse_zb}%` : '--'
                    n.number = datas[i]
                }
            });
        }
    }).finally(() => {
        loading.value = false
    })
}
// 重置信息
const reset = () => {
    data.forEach((n: any) => {
        n.number = ''
        n.practice1 = ''
        n.practice2 = ''
    })
}
onMounted(() => {
    getTokerData()
})
</script>
<style lang="less" scoped>
@import './components/day_month.less';

.store-board {
    background-color: #fff;
    border-radius: 4px;
    padding:  20px 0;
}

.search_list {
    :deep(.arco-form-item-label-col) {
        // justify-content: flex-start;
        width: 100%;
        flex: 0 0 60px;
    }

    :deep(.arco-form-item-wrapper-col) {
        width: 100%;
        flex: 0 0 calc(100% - 60px);
    }
}
:deep(.item-flex) {
    border: 1px solid red;
}
</style>