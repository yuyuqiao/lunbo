<!-- 月份 -->
<template>
    <!--  -->
    <div class="content_day">
        <div class="search_list">
            <div class="flex fw ac js">
                <div class="item-form flex ac js">
                    <span>月份: </span>
                    <a-month-picker :allow-clear="false" style="width: 120px;" :defaultValue="defaultMoonth"
                        placeholder="请选择月份" v-model="form.month" />
                </div>
                <div class="item-form flex ac js">
                    <span>门店: </span>
                    <a-cascader style="width: 260px;" v-model="form.all" @change="change" :field-names="fieldNames"
                        allow-search :options="options" placeholder="请选择" />
                </div>
            </div>
            <div class="a-btn">
                <a-button long html-type="getListsData" @click="getAllToker" type="primary">查询</a-button>
            </div>
        </div>
        <div class="list_content">
            <a-spin loading v-show="loading" style="left:50%" />
            <div v-show="!loading && isSShow">
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
    busno: '',
    orgname: '',
    all: '全部',
    leibie: '按全部',
    month: dayjs().format('YYYY-MM')
})
const defaultMoonth = dayjs().format('YYYY-MM')
const loading = ref(false)
const fieldNames = { value: 'busno', label: 'orgname' }
const options = ref<any>([])

const data = reactive(
    [
        {
            key: 'yxxse', title: '营销销售额', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'puyaoxse', title: '普药销售额', isPercent: false, number: '', isHundred: false, practice1: '', practice2: ''
        }, {
            key: 'hgxse', title: '换购销售额', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'hgkeliu', title: '换购交易笔数', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'ypdkeliu', title: '一品单交易数', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'shl_vip', title: '门店拓客总数量', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'zongkeliu', title: '总来客数', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'zonghyfugourenshu', title: '总会员复购人数', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'zonghyxse', title: '总会员销售额', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'zonghykedan', title: '总会员客单价', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'zongxse', title: '总销售额', isPercent: false, number: '', isHundred: true, practice1: '', practice2: ''
        }, {
            key: 'zonghykeliu', title: '总交易笔数', isPercent: false, number: '', isHundred: false, practice1: '', practice2: ''
        }, {
            key: 'bjpxse', title: '保健品售额', isPercent: false, number: '', isHundred: false
        }, {
            key: 'zyypxse', title: '中药饮片售额', isPercent: false, number: '', isHundred: false, practice1: ''
        }, {
            key: 'yszyxse', title: '中药养生售额', isPercent: false, number: '', isHundred: false, practice1: ''
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
// 判断是门店还是片区
const change = (val: any) => {
    form.orgname = form.busno = ''
    if (val == '-1') {
        form.leibie = '按全部'
        return
    }
    let pattern = new RegExp("[\u4E00-\u9FA5]+");
    if (pattern.test(val)) {
        form.leibie = '按片区'
        form.orgname = val
    } else {
        form.leibie = '按机构'
        form.busno = val
    }

}

// 获取拓客信息
const getAllToker = () => {
    getTokerData("get.org.shujucenter_yuefen_oa", data)
    // getTokerData("get.org.huiyuantuoke2", data)
    // getTokerData('get.org.huiyuantuoke', data)
}
const getTokerData = (gnbh: any, list: any) => {
    isSShow.value = true
    reset()
    loading.value = true
    db({
        gnbh: gnbh,
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
            list.forEach((n: any) => {
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
    getMDData()
    // getAllToker()
})
</script>
<style lang="less" scoped>
@import './day_month.less';

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