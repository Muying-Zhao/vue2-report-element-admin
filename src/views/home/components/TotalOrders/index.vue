<template>
  <div class="common-card">
    <common-card title="累计订单量"
    :value="orderToday">
      <!-- 默认插槽 -->
      <template>
        <!-- 方法一 -->
        <!-- <div id="total-orders-chart" :style="{ width: '100%', height: '100%' }">
        </div> -->
        <!-- 方法二 -->
        <v-chart :options="getOptions()" />
      </template>
      <!-- name="footer"插槽 -->
      <template v-slot:footer>
        <span>昨日订单量 </span>
        <span class="emphasis">{{ orderLastToday }}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'
export default {
  name: 'TotalOrders',
  mixins: [commonCardMixin, commonDataMixin],
  // 方法一
  // mounted () {
  //   const chartDom = document.getElementById('total-orders-chart')
  //   const chart = this.$echarts.init(chartDom)
  //   chart.setOption({
  //     xAxis: {
  //       type: 'category',
  //       // 隐藏坐标轴
  //       show: false,
  //       // 默认x轴距左右两边的间距
  //       boundaryGap: false
  //     },
  //     yAxis: {
  //       show: false
  //     },
  //     series: [{
  //       type: 'line',
  //       data: [620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220, 620],
  //       // 显示面积
  //       areaStyle: {
  //         color: 'purple'
  //       },
  //       lineStyle: {
  //         width: 0
  //       },
  //       // 线点隐藏
  //       itemStyle: {
  //         opacity: 0
  //       },
  //       smooth: true
  //     }],
  //     // 顶格显示
  //     grid: {
  //       top: 0,
  //       bottom: 0,
  //       left: 0,
  //       right: 0
  //     }
  //   })
  // }
  // 方法二
  methods: {
    getOptions () {
     return  this.orderTrend.length>0?
      {
        xAxis: {
          type: 'category',
          // 隐藏坐标轴
          show: false,
          // 默认x轴距左右两边的间距
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          // 来自外层传进来的
          data: this.orderTrend,
          // 显示面积
          areaStyle: {
            color: 'purple'
          },
          lineStyle: {
            width: 0
          },
          // 线点隐藏
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }],
        // 顶格显示
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      } : null
    }
  }
}
</script>
<style lang="scss" scoped></style>
