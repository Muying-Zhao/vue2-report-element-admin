<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">{{ userCount }}</div>
                <v-chart :options="searchUserOption"></v-chart>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{ searchCount }}</div>
                <v-chart :options="searchNumberOption"></v-chart>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="100"></el-table-column>
                <el-table-column prop="keyword" label="关键词" width="100"></el-table-column>
                <el-table-column prop="count" label="总搜索量"></el-table-column>
                <el-table-column prop="users" label="搜索总用户数"></el-table-column>
                <el-table-column prop="range" label="搜索占比"></el-table-column>
              </el-table>
              <!-- 做翻页器的 -->
              <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" background
                @current-change="onPageChange"></el-pagination>
            </div> 
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group 
              v-model="radioSelect" 
              size="small"
              @change="onCategoryChange">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOptions" class="pie"></v-chart>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'
const colors = [' #8d7fec','#5085f2','#f8726b','#e7e702','#78f283','#4bc1fc']

export default {
  mixins: [commonDataMixin],
  name: 'BottomView',
  data() {
    return {
      searchUserOption: {},
      searchNumberOption: {},
      tableData: [],
      totalData: [],
      total:0,
      pageSize:4,
      userCount:0,
      searchCount:0,
      radioSelect: '品类',
      categoryOptions: {}
    }
  },
  mounted() {
    this.renderPieChart()
  },
  methods: {
    onCategoryChange(type){
      this.radioSelect=type
      console.log(this.radioSelect, 'type')
      this.renderPieChart()
    },
    onPageChange(page) {
      // console.log(page)
      this.renderTable(page)
    },
    renderPieChart() {
      if(!this.category1.data1 || !this.category2.data1){
        return
      }
      let data
      let axis
      let total=0 
      if(this.radioSelect==='品类'){
        // 加上这个是为了控制调色盘colors  .slice(0,6)
        data=this.category1.data1.slice(0,6)
        axis=this.category1.axisX.slice(0, 6)
        total=data.reduce((s,i)=>s+i,0)
      }else{
        data = this.category2.data1.slice(0, 6)
        axis = this.category2.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      }
      const chartData=[]
      data.forEach((item,index)=>{
        const percent=`${(item/total*100).toFixed(2)}%`
        chartData.push({
          legendname: axis[index],
          value: item,
          percent,
          itemStyle: {
            color: colors[index % 6]
          },
          name: `${axis[index]} | ${percent}`
        })
      }) 
      this.categoryOptions = {
        title: [{
          text: `${this.radioSelect}分布`,
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '累计订单量',
          subtext: total,
          x: '34.5%',
          y: '42%',
          textStyle: {
            fontSize: 14,
            color: '#999'
          },
          textAlign: 'center',
          subtextStyle: {
            fontSize: 28,
            color: '#333'
          }
        }
        ],
        series: [{
          name: '品类分布',
          type: 'pie',
          data: chartData,
          label: {
            normal: {
              // 扇形name显示在外部还是内部
              position: 'outter',
              formatter: function (params) {
                // 昵称加上百分比，从parpms中获取
                // return `${params.data.legendname} | ${params.data.percent}`
                return `${params.data.legendname}`
              }
            }
          },
          // 圆心点位置
          center: ['35%', '50%'],
          // 半径内外
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },
          // 逆时针排列
          clockWise: false,
          itemStyle: {
            borderWidth: 4,
            borderColor: '#fff'
          }
        }],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        // 滑到扇形弹出阴影
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // console.log(params) params.marker小圆点
            const str = params.seriesName + '<br/>' + params.marker + params.data.legendname + '<br/>' + '数量' + params.data.value + '<br/>' + '占比' + params.data.percent + '%'
            return str
          }

        }
      }
    },
    renderTable(page){
      this.tableData=this.totalData.slice(
      (page-1)* this.pageSize,
      (page-1)*this.pageSize+this.pageSize)
    },
    renderLineChart(){
      const createOption=(key)=>{
        const data=[]
        const axis=[]
        this.wordCloud.forEach(item=>data.push(item[key]))
        this.wordCloud.forEach(item => axis.push(item.word))
        return {
          xAxis: {
            type: 'category',
            // 消除x轴边距123
            boundaryGap: false,
            data:axis
          },
          yAxis: {
            show: false
            // y轴定边解决方法
            // min: 0,
            // max: 300
          },
          tooltip:{},
          grid: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          },
          series: [{
            type: 'line',
            data,
            areaStyle: {
              color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
              color: 'rgba(95,187,255)'
            },
            // 标点
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }]
        }
      }
      this.searchUserOption= createOption('user')
      this.searchNumberOption= createOption('count')
    }
  },
  watch: {
    // { id: 1, 
    //   rank: 1,  
    //   keyword: '北京', 
    //   count: 100, 
    //   users: 90, 
    // range: '90%' },
    wordCloud() {
      // console.log('watch',this.wordCloud)
      const totalData = []
      this.wordCloud.forEach((item,index)=>{
        totalData.push({
          id:index+1,
          rank:index+1,
          keyword:item.word,
          count:item.count,
          users:item.user,
          // toFixed(2)保留两位小数
          range:`${((item.user/item.count)*100).toFixed(2)}%`
        })
      })
      this.totalData=totalData
      this.total= this.totalData.length
      this.renderTable(1) 
      // reduce累加方法，s是累加结果，i当前累加值,0表示累加起始值
      this.userCount=this.format(totalData.reduce((s, i) => i.users + s, 0))
      this.searchCount = this.format(totalData.reduce((s, i) => i.count + s, 0))
      this.renderLineChart()
      this.renderPieChart()
    },
    category1(){
      this.renderPieChart()
      // console.log('category1',this.category1)
    },
    category2() {
      this.renderPieChart()
      // console.log('category2', this.category2)
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;

  .view {
    flex: 1;

    &:first-child {
      padding: 0 10px 0 0;
      width: 50%;
      box-sizing: border-box;
    }

    &:last-child {
      padding: 0 0 0 10px;
    }

    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;

      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }

    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 452px;

      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;

        .chart {
          flex: 1;
          padding: 0 10px;

          .chart-title {
            color: #999;
            font-size: 14px;
          }

          .chart-data {
            font-size: 22px;
            color: #333;
            font-weight: 500;
            letter-spacing: 2px;
          }

          .echarts {
            height: 50px;
          }
        }
      }

      .table-wrapper {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px 20px;

        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
      }
    }
  }
}

// .chart {
//   width: 30%;
//   height: 100px;
// }
// .pie{
//   width: 40%;
//   height: 100px;
// }</style>
