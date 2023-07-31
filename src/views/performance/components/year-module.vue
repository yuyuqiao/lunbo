<!-- 年份 -->
<template>
  <div class="content_year">
    <div class="search_list">
      <div class="flex fw ac js">
        <div class="item-form flex ac js">
          <span>年份: </span>
          <a-year-picker :allow-clear="false" v-model="form.year" style="width: 100px;" />
        </div>
        <div class="item-form flex ac js">
          <span>门店: </span>
          <a-cascader style="width: 260px;" v-model="form.all" @change="change" :field-names="fieldNames" allow-search
            :options="options" placeholder="请选择" />
        </div>
      </div>
      <div class="a-btn">
        <a-button long html-type="getListsData" @click="submit" type="primary">查询</a-button>
      </div>
    </div>
    <div class="list_content">

      <a-table v-show="isSShow" :loading="loading" :columns="columns" :data="data" column-resizable
        :virtual-list-props="tableHeight" :pagination="false" @change="handleChange" :draggable="{}" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue';
import { useStore } from "vuex";
import { db } from "@/api/index";
import dayjs from 'dayjs'
import axios from 'axios'
let store = useStore()
const loading = ref(false)
let count = ref(0)
const isSShow = ref(false)
const cancecalSoure = axios.CancelToken.source() //取消请求
const form = reactive({
  year: dayjs().format('YYYY'),
  all: '全部',
  busno: '',
  orgname: '',
})
let tableHeight = reactive({
  height: 0
})
const fieldNames = { value: 'busno', label: 'orgname' }
const options = ref<any>([])
// 表头名 参数字段
const columns = reactive<any>([
  {
    title: '名称', dataIndex: 'name', width: 200,
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '一月', dataIndex: 'months1',
    sortable: { sortDirections: ['ascend', 'descend'] },
    bodyCellClass: (record: any) => {
      if (record.name == '日均毛利额达成率') {
        let className = record.months1 > 100 ? 'rise' : 'decline';
        return className
      }
    }
  },
  {
    title: '二月', dataIndex: 'months2',
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '三月', dataIndex: 'months3',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '四月', dataIndex: 'months4',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '五月', dataIndex: 'months5',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '六月', dataIndex: 'months6',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '七月', dataIndex: 'months7',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '八月', dataIndex: 'months8',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '九月', dataIndex: 'months9',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '十月', dataIndex: 'months10',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '十一月', dataIndex: 'months11',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '十二月', dataIndex: 'months12',
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
])
// 数据
let data = ref<any>([])
const handleChange = (_data: any) => {
  data = _data
}
//获取门店数据
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
// 获取列表数据
const num = ref(1)
const getListsData = () => {
  if (count.value == 0) loading.value = true
  console.log(count.value)
  db({
    gnbh: "pc_hqnsjzx",
    dzyid: store.state.user?.userinfor?.dzyid,
    orgid: store.state.user?.userinfor?.orgid,
    token: store.state.user?.userinfor?.token,
    erpid: store.state.user?.userinfor?.erpid,
    year: dayjs(form.year).format('YYYY'),
    orgname: form.orgname,
    busno: form.busno,
    type: count.value
  }).then((res: any) => {
    if (count.value < 43) {
      count.value = count.value + 1
      getListsData()
    }
    if (res.code == '-1') return
    let datas = res.data
    data.value.push(datas)

  }).finally(() => {
    if (count.value == 1) loading.value = false
  })
}
// }
const submit = () => {
  isSShow.value = true
  data.value = []
  count.value = 0
  getListsData()
}
onMounted(() => {
  tableHeight.height = window.innerHeight - 370
  getMDData()
  // getListsData()
})
onBeforeUnmount(() => {
  // 销毁接口请求
  window._axiosPromiseArr.forEach((ele: any, index: any) => {
    ele.cancel()
    delete window._axiosPromiseArr[index]
  })

})
</script>
<style lang="less" scoped>
@import './day_month.less';

:deep(.rise) {
  color: green;
}

:deep(.decline) {
  color: red;
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

.list_content {
  padding: 0 20px 20px 20px;
}
</style>