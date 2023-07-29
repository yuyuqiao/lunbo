<template>
  <!-- 公告 -->
  <div class="container">
    <Breadcrumb :items="['仪表盘', '公告列表']" />
    <div class="monitor-box">
      <SearchModel @search="search" />
      <a-space direction="vertical" fill><a-button type="primary" class="" @click="add_edit(null, 'add')"><template #icon>
            <icon-plus />
          </template>新增</a-button>
        <a-table :columns="columns" :data="data">
          <template #action="{ record }">
            <a-space>
              <a-button @click="add_edit(record, 'edit')">修改</a-button>
              <a-button @click="del(record)">删除</a-button>
              <a-button @click="add_edit(record, 'view')">view</a-button></a-space>
          </template>
        </a-table>
        <a-table :columns="columns" :data="data" :scroll="scroll" :bordered="{ cell: true }" @change="handleChange"
          column-resizable :draggable="{ type: 'handle', width: 40 }" @select="handSelectRow"
          :row-selection="rowSelection" row-key="name" :expandable="expand">
          <template #action="{ record }">
            <a-button @click="add_edit(record, 'view')">view</a-button>
          </template>
        </a-table></a-space>

      <div ref="main" style="width: 100%; height: 400px"></div>
    </div>
    <!-- 新增删除 -->
    <AddModel :isShowAddOrEdit="isShowAddOrEdit" :form="formInfor" :type="type" @close="close" @addOrEdit="submitInfor" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import SearchModel from "./components/search-model.vue"
import AddModel from "./components/add-model.vue"
import { number } from 'echarts';
import BarGraph from "./barGraph.vue";
const isShowAddOrEdit = ref<boolean | undefined>(false)
const formInfor = ref<object | undefined>()
const type = ref()
// 拓展
const expand = reactive({
  title: 'Expand',
  with: 80,
  expandedRowRender: (val: any) => {
    if (val.key == '2') return `这是第二条数据展示：${val.expand}`
  }
})
// 滚动设置
const scroll = {
  x: 2000,
  y: 200
}
// 选择框
const rowSelection: any = {
  type: 'radio'
}
const handSelectRow = (row: any) => {
  console.log(row, '选择的数据')
}
// 表头名 参数字段
const columns = reactive<any>([
  {
    title: '姓名', dataIndex: 'name',
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '邮箱', dataIndex: 'email', type: number,
    sortable: { sortDirections: ['ascend', 'descend'] }
  },
  {
    title: '地址', dataIndex: 'address'
  },
  {
    title: '详情', dataIndex: 'detail'
  }, {
    title: '爱好', dataIndex: 'hobby'
  },
  {
    title: '电话', dataIndex: 'tel'
  },
  { title: '操作', fixed: 'right', slotName: 'action' }
])
// 数据
const data = ref([{
  key: '1', name: '大卫', email: 45, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987',
  expand: '收缩的数据，隐藏的数据，是否展示该数据'
}, {
  key: '2', name: '凡尔纳', email: 67.8, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987',
  expand: '收缩的数据，隐藏的数据，是否展示该数据'
}
  , {
  key: '3', name: '保罗', email: 23, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '4', name: '戴维', email: 576, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '5', name: '老舍', email: 1, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '6', name: '鲁迅', email: 5, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}, {
  key: '7', name: '马克思', email: 2, address: '大沙田公平街', detail: '今天的天气，早上大暴雨，过后大晴天,总之是一个美妙的天空', hobby: '打羽毛球', tel: '12345678987'
}])
const handleChange = (_data: any) => {
  data.value = _data
}
// 打开新增修改弹窗
const add_edit = (record: object | null, t: any) => {
  console.log('修改数据', record)
  isShowAddOrEdit.value = true
  type.value = t
  if (!record) formInfor.value = undefined
  else formInfor.value = { ...record }
}
// 删除
const del = (record: object) => {
  console.log('删除数据', record)
}
// 提交新增或者修改信息
const submitInfor = (item: any, flag: any) => {
  if (!flag) {
    // 新增信息
    data.value.push(item._rawValue)
  } else {
    // 修改
    data.value.forEach((i, index) => {
      if (i.key == item._rawValue?.key) {
        data.value[index] = item._rawValue
      }
    });
  }

  isShowAddOrEdit.value = false
  console.log(item._rawValue, '信息', flag)
}
// 关闭弹窗
const close = () => {
  isShowAddOrEdit.value = false
}
// 根据条件搜索
const search = (val: any) => {
  console.log('搜索', val)
}


import * as echarts from "echarts";
const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(() => {
  init();
})
// 图表初始化

function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(main.value);
  const schoolData = [
    {
      name: '张三',
      value: 4253
    },
    {
      name: '李四',
      value: 5691
    },
    {
      name: '王五',
      value: 4536
    },
    {
      name: '赵六',
      value: 4369
    },
    {
      name: '周七',
      value: 5124
    }]
  // 指定图表的配置项和数据
  const option:any = {
    title: {
      text: '个人存款',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '<br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: []
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{ value: 335, name: '' }]
      }
    ]
  };
  // 赋值
  option.series = [
    {
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      // data: res.data.map((v) => {
      //   return { name: v.name, value: v.value }
      // })
      data: schoolData,
    }
  ]
  // 赋值
  // option.legend = [
  //   {
  //    data: schoolData.map((a) => a.name)
  //   }
  // ]
  // 赋值
  option.legend.data = schoolData.map((a) => a.name)

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

</script>
<style lnag="less" scoped>
.monitor-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>