<template>
    <!-- 简单的demo -->
    <!-- <ve-map :data="chartData" height="800px"></ve-map> -->
    <!-- ve虽然不能自带很多丰富的样式设计，但其可以在此基础上使用百度地图，套用的壳，使用其也方便 -->
    <ve-bmap :settings="chartSettings" height="100%" :title="title" :tooltip="tooltip" :series="chartSeries"></ve-bmap>
</template>
<script>
/* eslint-disable */
// 如果报了属性中不允许使用单引号是，可以采用  eslint-disable-next-line quote-props来解决
import commonDataMixin from '@/mixins/commonDataMixin'

const convertData = function (data,geo) {
    const res = []
    data.forEach((item) => {
        const { name, value } = item
        const coord = geo[name]
        res.push({
            name,
            value: [...coord, value]
        })
    })
    return res
}
export default {
    name: 'BMapScatter',
    mixins: [commonDataMixin],
    data() {
        return {
            title: {
                text: '外卖销售数据大盘',
                subtext: '销售趋势统计',
                sublink: 'https://www.imooc.com',
                left: 'center'
            },
            tooltip: {},
            chartSeries: [],
            chartSettings: {
                key: 'G1LEyjrNGTkns50fpZnrCGAKxpycPLwb',
                bmap: {
                    key: 'G1LEyjrNGTkns50fpZnrCGAKxpycPLwb',
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    // roam是否允许缩放
                    roam: false,
                    mapStyle: {
                        styleJson: [{
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'land',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#f3f3f3'
                            }
                        }, {
                            'featureType': 'railway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fdfdfd'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'green',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'subway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'local',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'building',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'label',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#999999'
                            }
                        }]
                    }
                },
            }
        }
    },
    watch:{
        mapData(){
            const {data,geo}=this.mapData
            this.chartSeries=[{
                name: '销售额',
                type: 'scatter', // 散点
                coordinateSystem: 'bmap',
                data: convertData(data,geo),
                encode: {
                    value: 2
                }, // 用第几位数据来表示，2表示第三位
                itemStyle: {
                    color: 'purple'
                },
                symbolSize: function (val) {
                    return val[2] / 10
                }, // 点的大小设置
                label: {
                    show: false,
                    position: 'right ',
                    formatter: function (v) {
                        return `${v.data.name} - ${v.data.value[2]}`
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }, {
                name: 'Top10',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value
                }),geo).slice(0, 10), //sort排序方法,然后再slice取出前十数据
                symbolSize: function (val) {
                    return val[2] / 10
                },
                encode: {
                    value: 2
                },
                label: {
                    formatter: function (v) {
                        return `${v.data.name} - ${v.data.value[2]}`
                    },
                    position: 'right',
                    show: true
                },
                hoverAnimation: true,
                rippleEffect: {
                    brushType: 'stroke'
                },
                itemStyle: {
                    color: 'purple',
                    shadowBlur: 10, //阴影
                    shadowColor: '#333'
                },
            }]
        }
    }
}
</script>
<style scoped></style>