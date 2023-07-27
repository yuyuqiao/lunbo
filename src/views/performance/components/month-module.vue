<!-- 月份 -->
<template>
    <!--  -->
    <div class="content_day">
        <div class="search_list">
            <a-form ref="formRef" :model="form" @submit="submit">
                <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
                    <a-col :span="10">
                        <a-form-item field="busno" label="月份">
                            <a-month-picker style="width: 100%;" :defaultValue="defaultMoonth" placeholder="请选择月份"
                                v-model="form.month" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="10">
                        <a-form-item field="busno" label="门店">
                            <a-cascader style="width: 100%;" v-model="form.all" @change="change" :field-names="fieldNames"
                                allow-search :options="options" placeholder="请选择" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="4" style="text-align: right;">
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
            <div v-show="!loading" v-for="(item, i) in data" :key="i">
                <div class="list_title"><icon-bytedance-color /><span class="text">{{ item.title }}</span></div>
                <MgShowData :data="item.list" />
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
    month: dayjs().format('YYYY-MM')
})
const defaultMoonth = dayjs().format('YYYY-MM')
const loading = ref(false)
const fieldNames = { value: 'busno', label: 'orgname' }
const options = ref<any>([])

const data = reactive(
    [
        {
            title: '员工销售分析表',
            list: [{
                key: '', title: '总销售额', isPercent: false, number: '', isHundred: true
            }, {
                key: '', title: '个人交易笔数', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '营销销售额', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '营销销售额交易笔数', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '营销销售额占比', isPercent: true, number: '', isHundred: false
            }, {
                key: '', title: '保健品售额', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '中药饮片售额', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '中药养生售额', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '普药销售额', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '普药交易笔数', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '普药销售额占比', isPercent: true, number: '', isHundred: false
            }, {
                key: '', title: '一品单交易数', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '换购销售额', isPercent: false, number: '', isHundred: false
            }]
        }, {
            title: '门店会员拓客报表',
            list: [{
                key: '', title: '换购交易笔数', isPercent: false, number: '', isHundred: false
            }, {
                key: '', title: '换购转换率', isPercent: true, number: '', isHundred: false
            }, {
                key: '', title: '换购销售额占比', isPercent: true, number: '', isHundred: false
            }, {
                key: 'allvipshl', title: '门店拓客总数量', isPercent: false, number: '', isHundred: false
            }, {
                key: 'effvipshl', title: '门店拓客有效数量', isPercent: false, number: '', isHundred: false
            }, {
                key: 'zongkeliu', title: '总来客数', isPercent: false, number: '', isHundred: false
            }, {
                key: 'allkeliu', title: '总会员来客数', isPercent: false, number: '', isHundred: false
            }, {
                key: 'buyers', title: '总会员复购人数', isPercent: false, number: '', isHundred: false
            }, {
                key: 'fugou_lv', title: '总会员复购率', isPercent: true, number: '', isHundred: false
            }, {
                key: 'kedan', title: '总会员客单价', isPercent: false, number: '', isHundred: false
            }, {
                key: 'sshje_zb', title: '总会员销售额占比', isPercent: true, number: '', isHundred: false
            }
            ]
        }
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
    if (val == '-1') return
    let pattern = new RegExp("[\u4E00-\u9FA5]+");
    if (pattern.test(val)) {
        form.orgname = val
    } else {
        form.busno = val
    }

}

// 获取拓客信息
const getAllToker = () => {
    // 门店拓客总数量接口
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000);
    getTokerData("get.org.huiyuantuoke1", data[1].list)
    getTokerData("get.org.huiyuantuoke2", data[1].list)
    getTokerData('get.org.huiyuantuoke', data[1].list)
}
const getTokerData = (gnbh: any, list: any) => {
    db({
        gnbh: gnbh,
        dzyid: store.state.user?.userinfor?.dzyid,
        orgid: store.state.user?.userinfor?.orgid,
        token: store.state.user?.userinfor?.token,
        erpid: store.state.user?.userinfor?.erpid,
        yuefen: dayjs(form.month).format('YYYY-MM'),
        orgname: form.orgname,
        busno: form.busno,
    }).then(res => {
        let datas = res.data[0]
        for (let i in datas) {
            list.forEach((n: any) => {
                if (n.key == i) {
                    n.number = datas[i]
                }
            });
        }
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
        month: dayjs(form.month).format('YYYY-MM'),
        orgname: form.orgname,
        busno: form.busno,
    }).then(res => {
        let datas = res.data
        // for (let i in datas) {
        //     data.forEach((item: any) => {
        //         item.list.forEach((n: any) => {
        //             if (n.key == i) {
        //                 n.number = datas[i]
        //             }
        //         });


        //     });
        // }
    }).finally(() => {
        loading.value = false
    })
}
const submit = () => {
    getAllToker()
}
onMounted(() => {
    getMDData()
    getAllToker()
    // getListsData()
})
</script>
<style lang="less" scoped>
@import './day_month.less';
</style>