<template>
  <div class="common-card">
        <common-card title="今日交易用户数" value="¥ 1,277,549">
          <!-- 默认插槽 -->
          <template>
            <!-- 方法一 -->
            <!-- <div id="today-users-chart" :style="{ width: '100%', height: '100%' }">
            </div> -->
            <!-- 方法二 -->
            <v-chart :options="getOptions()" />
          </template>
          <!-- name="footer"插槽 -->
          <template v-slot:footer>
            <span>退货率 </span>
            <span class="emphasis">5.49%</span>
          </template>
        </common-card>
      </div>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
  name: 'TodayUsers',
  mixins: [commonCardMixin],
  // 方法一
  // mounted () {
  //   const chartDom = document.getElementById('today-users-chart')
  //   const chart = this.$echarts.init(chartDom)
  //   chart.setOption({
  //     color: ['#3398DB'],
  //     series: [{
  //       // 柱状图
  //       type: 'bar',
  //       barWidth: '60%',
  //       data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150]
  //     }],
  //     xAxis: {
  //       type: 'category',
  //       show: false,
  //       data: ['00:00', '01: 00', '02:00 ', '03:00', '04: 00', 'Q5: 00', '06: 00', '07: 00', '08:00', '09:00', '10:00', '11:00', '12:00']
  //     },
  //     yAxis: {
  //       show: false
  //     },
  //      grid: {
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
      return {
            color: ['#3398DB'],
            series: [{
              // 柱状图
              type: 'bar',
              barWidth: '60%',
              data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150]
            }],
            xAxis: {
              type: 'category',
              show: false,
              data: ['00:00', '01: 00', '02:00 ', '03:00', '04: 00', 'Q5: 00', '06: 00', '07: 00', '08:00', '09:00', '10:00', '11:00', '12:00']
            },
            yAxis: {
              show: false
            },
             grid: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }
          }
    }
  }
}
</script>
<style lang="scss" scoped></style>
