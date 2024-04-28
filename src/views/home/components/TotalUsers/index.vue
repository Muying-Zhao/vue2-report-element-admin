<template>
  <div class="common-card">
    <common-card title="累计用户数" value="¥ 2,257,581">
      <!-- 默认插槽 -->
      <template>
        <!-- 方法一 -->
        <!-- <div id="total-users-chart" :style="{ width: '100%', height: '100%' }">
        </div> -->
         <!-- 方法二 -->
              <v-chart :options="getOptions()" />
      </template>
      <!-- name="footer"插槽 -->
      <template v-slot:footer>
        <div class="compare-wrapper">
          <div class="compare">
            <span>日同比</span>
            <span class="emphasis">125.71%</span>
            <div class="increase" />
          </div>
          <div class="compare">
            <span>月同比</span>
            <span class="emphasis">182,14%</span>
            <div class="decrease" />
          </div>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
  name: 'TotalUsers',
  mixins: [commonCardMixin],
  // 方法一
  // mounted () {
  //   const chartDom = document.getElementById('total-users-chart')
  //   const chart = this.$echarts.init(chartDom)
  //   chart.setOption({
  //     xAxis: {
  //       type: 'value',
  //       show: false
  //     },
  //     yAxis: {
  //       type: 'category',
  //       show: false
  //     },
  //     grid: {
  //       top: 0,
  //       bottom: 0,
  //       left: 0,
  //       right: 0
  //     },
  //     series: [{
  //       type: 'bar',
  //       // stack相同就可以将两条线合并，并制图表只需写一个barWidth
  //       stack: '总量',
  //       data: [100],
  //       barWidth: '10px',
  //       itemStyle: {
  //         color: '#45c946'
  //       }
  //     }, {
  //       type: 'bar',
  //       stack: '总量',
  //       data: [250],
  //       itemStyle: {
  //         color: '#eee'
  //       }
  //     }, {
  //       type: 'custom',
  //       // stack: '总量',
  //       data: [100],
  //       renderItem: (params, api) => {
  //         // console.log(params, api)
  //         const value = api.value(0)
  //         const endPoint = api.coord([value, 0])
  //         // console.log(endPoint)
  //         return {
  //           type: 'group',
  //           position: endPoint,
  //           children: [{
  //             type: 'path',
  //             shape: {
  //               d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
  //               x: -5,
  //               y: 5,
  //               width: 10,
  //               height: 10,
  //               layout: 'cover'
  //             },
  //             style: {
  //               fill: '#45c946'
  //             }
  //           },
  //         {
  //             type: 'path',
  //             shape: {
  //               d: 'M0 767.909l512.029 - 511.913L1024 767.909 0 767.909z',
  //               x: -5,
  //               y: -15,
  //               width: 10,
  //               height: 10,
  //               layout: 'cover'
  //             },
  //             style: {
  //               fill: '#45c946'
  //             }
  //           }]
  //         }
  //       }
  //     }]
  //   })
  // }
  // 方法二
  methods: {
    getOptions () {
      return {
            xAxis: {
              type: 'value',
              show: false
            },
            yAxis: {
              type: 'category',
              show: false
            },
            grid: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            },
            series: [{
              type: 'bar',
              // stack相同就可以将两条线合并，并制图表只需写一个barWidth
              stack: '总量',
              data: [100],
              barWidth: '10px',
              itemStyle: {
                color: '#45c946'
              }
            }, {
              type: 'bar',
              stack: '总量',
              data: [250],
              itemStyle: {
                color: '#eee'
              }
            }, {
              type: 'custom',
              // stack: '总量',
              data: [100],
              renderItem: (params, api) => {
                // console.log(params, api)
                const value = api.value(0)
                const endPoint = api.coord([value, 0])
                // console.log(endPoint)
                return {
                  type: 'group',
                  position: endPoint,
                  children: [{
                    type: 'path',
                    shape: {
                      d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                      x: -5,
                      y: 5,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  },
                {
                    type: 'path',
                    shape: {
                      d: 'M0 767.909l512.029 - 511.913L1024 767.909 0 767.909z',
                      x: -5,
                      y: -15,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  }]
                }
              }
            }]
          }
    }
  }
}
</script>
<style lang="scss" scoped>
.compare-wrapper {
  height: 100%;
  display: flex;
  align-items: center;

  .compare {
    margin-top: 3px;
    display: flex;
    font-size: 12px;
    color: #666;
    display: flex;
    align-items: center;
  }
}
</style>
