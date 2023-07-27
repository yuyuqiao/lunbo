<!-- 年份 -->
<template>
  <div class="content_year">
    <div class="search_list">
      <a-form ref="formRef" :model="form" @submit="submit">
        <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
          <a-col :span="10">
            <a-form-item field="busno" label="年份">
              <a-year-picker v-model="form.year" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item field="busno" label="门店">
              <a-cascader style="width: 100%;" v-model="form.all" @change="change" :field-names="fieldNames" allow-search
                :options="options" placeholder="请选择" />
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
      <a-table :columns="columns" :data="data" column-resizable :draggable="{ type: 'handle', width: 30 }" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from "vuex";
import { db } from "@/api/index";
import dayjs from 'dayjs'
let store = useStore()
const form = reactive({
  year: '',
  all: '',
  busno: '',
  orgname: '',
})
const fieldNames = { value: 'busno', label: 'orgname' }
const options = ref<any>([])
// 表头名 参数字段
const columns = reactive<any>([
  {
    title: '名称', dataIndex: 'name',
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '一月', dataIndex: 'email', type: Number,
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '二月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '三月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '四月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '五月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '六月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '七月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '八月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '九月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '十月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '十一月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  }, {
    title: '十二月', dataIndex: 'address',
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
])
// 数据
const data = ref([{
  key: '1', name: '大卫', email: '45', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987',
  expand: '收缩的数据，隐藏的数据，是否展示该数据'
}, {
  key: '2', name: '凡尔纳', email: '67.8', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987',
  expand: '收缩的数据，隐藏的数据，是否展示该数据'
}
  , {
  key: '3', name: '保罗', email: '23', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '4', name: '戴维', email: '576', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '5', name: '老舍', email: '1', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '6', name: '鲁迅', email: '5', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '7', name: '马克思', email: '2', address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}])
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
const submit = () => {
  console.log('提交信息', form)
}
onMounted(() => {
  getMDData()
})
</script>
<style lang="less" scoped>
.rise {
  color: green;
}

.decline {
  color: red;
}

.search_list {
  padding: 0 20px;

  :deep(.arco-form-item-label-col) {
    justify-content: flex-start;
    width: 100%;
    flex: 0 0 60px;
  }

  :deep(.arco-form-item-wrapper-col) {
    width: 100%;
    flex: 0 0 calc(100% - 60px);
  }

  .a-btn {}
}

.list_content {
  padding: 0 20px 20px 20px;

  .item-flex {
    width: calc(calc(100% - 160px) / 4);
    min-width: 300px;
    height: 100px;
    font-size: 18px;
    padding: 0 20px;
    margin-bottom: 10px;

    span {
      display: inline-block;
      margin: 10px 0 0 10px;
      font-size: 26px;
      font-weight: bolder;
    }

    // &:nth-last-of-type(4n) {
    //     padding-right: 0;
    // }
  }
}
</style>