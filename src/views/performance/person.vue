<!-- 个人 -->
<template>
    <div class="container">
        <Breadcrumb :items="['业绩看板', '个人状况 ']" />
        <div class=" store-board">
            <div class="content_day">
                <div class="search_list">
                    <div class="flex fw ac js">
                        <div class="item-form flex ac js">
                            <span>月份: </span>
                            <a-month-picker :allow-clear="false" style="width: 120px;" :defaultValue="defaultMoonth"
                                placeholder="请选择月份" v-model="form.month" />
                        </div>
                    </div>
                    <div class="a-btn">
                        <a-button long html-type="getListsData" @click="getTokerData" type="primary">查询</a-button>
                    </div>
                </div>
                <div class="list_content">
                    <a-spin loading v-show="loading" style="left:50%" />
                    <div v-show="!loading&&isSShow">
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
const isSShow = ref(false)
const form = reactive<any>({
    all: '全部',
    leibie: '按个人',
    month: dayjs().format('YYYY-MM')
})
const defaultMoonth = dayjs().format('YYYY-MM')
const loading = ref(false)
const data = reactive(
    [
        {
            key: 'yxxse', title: '营销销售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'puyaoxse', title: '普药销售额', isPercent: false, number: '', isHundred: false, practice1: '', practice2: '', isShow: true
        }, {
            key: 'hgxse', title: '换购销售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'hgkeliu', title: '换购交易笔数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'ypdkeliu', title: '一品单交易数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'shl_vip', title: '门店拓客总数量', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zongkeliu', title: '总来客数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zonghyfugourenshu', title: '总会员复购人数', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zonghyxse', title: '总会员销售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zonghykedan', title: '总会员客单价', isPercent: false, number: '', isHundred: false, practice1: '', isShow: true
        }, {
            key: 'zongxse', title: '总销售额', isPercent: false, number: '', isHundred: true, practice1: '', practice2: '', isShow: false
        }, {
            key: 'grkeliu', title: '个人交易笔数', isPercent: false, number: '', isHundred: false, practice1: '', practice2: '', isShow: false
        }, {
            key: 'bjpxse', title: '保健品售额', isPercent: false, number: '', isHundred: false, isShow: false
        }, {
            key: 'zyypxse', title: '中药饮片售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: false
        }, {
            key: 'yszyxse', title: '中药养生售额', isPercent: false, number: '', isHundred: false, practice1: '', isShow: false
        },
    ])
// 获取拓客信息
const getTokerData = () => {
    isSShow.value = true
    reset()
    loading.value = true
    db({
        gnbh: 'get.org.shujucenter_yuefen_oa',
        dzyid: store.state.user?.userinfor?.dzyid,
        orgid: store.state.user?.userinfor?.orgid,
        token: store.state.user?.userinfor?.token,
        erpid: store.state.user?.userinfor?.erpid,
        yuefen: dayjs(form.month).format('YYYY-MM'),
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
</script>
<style lang="less" scoped>
@import './components/day_month.less';

.store-board {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 0;
}
.search_list {
    padding: 20px;
    position: relative;

    .a-btn {
        width: 100px;
        position: absolute;
        right: 20px;
        bottom: 40px;
    }

    .item-form {
        margin: 0 20px 20px 0;
        
        span {
            margin-right: 10px;
        }
    }
}
</style>