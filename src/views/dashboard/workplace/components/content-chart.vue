<template>
  <div ref="myChart" class="echart_al"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "home",
  components: {
  },
  setup(){
    const myChart = ref<HTMLElement>();  //也可以用const myChart = ref<any>();
    const myCharts = ref<any>();
    setTimeout(() => {
      // 绘制图表
      myCharts.value = echarts.init(myChart.value!);
      myCharts.value.setOption({
        title: { text: "降水量" },
        tooltip: {},
        xAxis: {
          data: ["6-3", "6-4", "6-5", "6-6", "6-7", "6-8"],
        },
        yAxis: {},
        series: [
          {
            name: "降水量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    }, 10);
    return {
      myChart,
    };
  }
});
</script>
<style scoped>
.echart_al{
  width: 100%;
  height: 600px;
  background-color: #fff;
}
</style>
