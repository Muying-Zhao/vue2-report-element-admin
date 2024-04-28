<template>
    <div class="home">
        <top-view />
        <sales-view />
        <bottom-view />
        <map-view />
        <!-- demo1 -->
        <!-- <v-chart :options="data"></v-chart> -->
        <!-- demo2 -->
        <!-- <ve-line
     :data="data"
    ></ve-line> -->
    </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import TopView from './components/TopView'
import BottomView from './components/BottomView'
import MapView from './components/MapView'
import SalesView from './components/SalesView'
// 发送http请求
import { wordcloud, screenData, mapScatter } from '@/api/home'

export default {
    name: 'HomeView',
    components: {
        TopView,
        BottomView,
        MapView,
        SalesView
    },
    data() {
        return {
            reportData: null,
            wordCloud: null,
            mapData: null
        }
    },
    // 在函数执行的时候再去获取值
    methods: {
        getReportData() {
            return this.reportData
        },
        getWordCloud() {
            return this.wordCloud
        },
        getMapData() {
            return this.mapData
        }
    },
    // 实现组件通信,可以直接在具体组件进行接受该值，inject:[]进行接受
    provide() {
        return {
            getReportData: this.getReportData,
            getWordCloud: this.getWordCloud,
            getMapData: this.getMapData
        }
    },
    mounted() {
        // 获取接口数据 mapScatter()..then(data => console.log(data))
        // 捕获异常.catch(err=>alert(err.message))
        wordcloud().then(data =>
        // console.log(data)
        //箭头函数不应该直接返回表达式
        {
            this.wordCloud = data
            console.log(data, 'wordcloud')
        }
        )
        screenData().then(data => {
            console.log(data, 'screenData')
            this.reportData = data
        })
        mapScatter().then(data => {
            this.mapData = data
            console.log(data, 'mapScatter')
        })
    }
    // demo1 vue官方echart组件
    // data () {
    //   return {
    //     data: {
    //       xAxis: { type: 'category' },
    //       yAxis: {},
    //       series: [{
    //         type: 'line',
    //         data: [100, 200, 300]
    //       }]
    //     }
    //   }
    // }
    // demo2 vue官方echart组件
    // data () {
    //   return {
    //     data: {
    //       columns: ['日期', '销售额'],
    //       rows: [
    //         { '日期': '1月1日', '销售额': 123 },
    //         { '日期': '1月2日', '销售额': 1223 },
    //         { '日期': '1月3日', '销售额': 2123 },
    //         { '日期': '1月4日', '销售额': 4123 },
    //         { '日期': '1月5日', '销售额': 3123 },
    //         { '日期': '1月6日', '销售额': 7123 }
    //       ]
    //     }
    //   }
    // }

}
</script>
<style scoped>
.home {
    width: 100%;
    padding: 20px;
    margin: 0;
    background: #eee;
    box-sizing: border-box;
}
</style>
