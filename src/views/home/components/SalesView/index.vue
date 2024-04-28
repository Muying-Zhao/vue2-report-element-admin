<template>
  <div class="sales-view">
    <el-card shadow="hover" :body-style="{ padding: '0 0 20 0' }">
      <template v-slot:header>
        <div class="menu-wrapper">
          <!-- horizontal水平方向 -->
          <el-menu :default-active="activeIndex" mode="horizontal" @select="onMenuSelect" class="sales-view-menu">
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日" />
              <el-radio-button label="本周" />
              <el-radio-button label="本月" />
              <el-radio-button label="今年" />
            </el-radio-group>
            <!-- unlink-panels功能是当选择日期切换不跟随联动 -->
            <el-date-picker type="daterange" v-model="date" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" size="small" unlink-panels :picker-options="pickerOptions"
              class="sales-view-date-picker" />
          </div>
        </div>
      </template>
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart :options="chartOption" />
          <div class="sales-view-list">
            <div class="sales-view-title">排行榜</div>
            <div class="list-item-wrapper">
              <div class="list-item" v-for="item in rankData" :key="item.no">
                <!-- 给前三个数增加一个类名 -->
                <!-- <div class="list-item-no" :class="+item.no<=3?'top-no':''">{{ item.no }}</div> -->
                <!-- 第二种写法优雅 -->
                <!-- <div :class="['list-item-no',+item<=3?'top-no':'']"></div> -->
                <div class="list-item-no" :class="+item.no <= 3 ? 'top-no' : ''">{{ item.no }}</div>
                <div class="list-item-name">{{ item.name }}</div>
                <div class="list-item-money">{{ item.money }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'
export default {
  name: 'SalesView',
   mixins: [commonDataMixin],
  data () {
    return {
      // 注意是string的1，如果为number型则失效
      activeIndex: '1',
      radioSelect: '今日',
      date: null,
      // date左边选项卡
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const start = new Date()
            const end = new Date()
            // 精确到毫秒
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick (picker) {
            const start = new Date()
            const end = new Date()
            // 精确到毫秒
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick (picker) {
            const start = new Date()
            const end = new Date()
            // 精确到毫秒
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      chartOption: {
      }
    }
  },
  // 监控某一状态的变化
  watch: {
    // 由外层传递寄进来的属性
    orderFullYear(){
      this.render(this.orderFullYear,this.orderFullYearAxis,'年度销售额')
    }
  },
  // 动态渲染计算属性
  computed: {
    rankData(){
      return this.activeIndex==='1'? this.orderRank:this.userRank
    }
  },
  methods: {
    onMenuSelect (index) {
      this.activeIndex = index
      // console.log(this.activeIndex)
      if(this.activeIndex=='1'){
        this.render(this.orderFullYear,this.orderFullYearAxis,'年度销售额')
      }else{
        this.render(this.userFullYear, this.userFullYearAxis, '年度用户访问量')
      }
    },
    // 传入三个不同的内容进行tab替换
    render(data,axis,title){
      this.chartOption={
        title: {
          text: title,
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },
        xAxis: {
          type: 'category',
          data: axis,
          // x轴上有一点短横线
          axisTick: {
            alignWithLabel: true,
            lineStyle: '#999'
          },
          // x轴线
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          // x轴标签
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          // y轴线要不要显示
          axisLine: {
            show: false
          },
          // y轴上有一点短横线要不要隐藏
          axisTick: {
            show: false
          },
          // y轴横线的线条
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: '35%',
          data: data,
        }],
        color: ['#3398DB'],
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sales-view {
  margin-top: 20px;

  .menu-wrapper {
    display: flex;
    position: relative;

    .sales-view-menu {
      width: 100%;
      padding-left: 20px;

      .el-menu-item {
        height: 50px;
        line-height: 50px;
        margin: 0 20px;
      }
    }

    .menu-right {
      position: absolute;
      top: 0;
      right: 20px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .sales-view-date-picker {
        margin-left: 20px;
      }
    }
  }

  .sales-view-chart-wrapper {
    display: flex;
    height: 270px;

    .echarts {
      // flex-grow: 0; flex-shrink: 0;flex-basis: 70%;
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }

    .sales-view-list {
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .sales-view-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }

      .list-item-wrapper {
        margin-top: 15px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          padding: 6px 20px 6px 0;

          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;

            &.top-no {
              background: #000;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }
          .list-item-name{
            margin-left: 10px;
            color: #333;
          }
          .list-item-money{
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
