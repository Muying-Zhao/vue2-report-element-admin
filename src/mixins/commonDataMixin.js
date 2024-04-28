//千分号
// (+v)可以转化成num形式，使用v为string后一个失效，使用v.toLocaleString()也可以转化成千分号，但有局限性
function format(v) {
    // return (+v).toLocaleString()
    // 正则方法
    // const v=1234567890
    // /g将字符串挨个返回
    // 正向预查(?=(\d{3})+$)某位为3个数，不然不成立
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    // `${v}`转化字符串
    // console.log(`${v}`.match(reg))
    return `${v}`.replace(reg, `$&,`)
}

//人民币 
function wrapperMoney(o, k) {
    return o && o[k] ? `¥ ${format(o[k])}` : `¥ 0.00`
}
//百分数
function wrapperPercentage(o, k) {
    return o && o[k] ? `${o[k]}%` : '0%'
}

function wrapperOriginalNumber(o, k) {
    return o && o[k] ? o[k] : 0
}

function wrapperNumber(o, k) {
    return o && o[k] ? format(o[k]) : '0'
}

function wrapperArray(o, k) {
    return o && o[k] ? o[k] : []
}

function wrapperObject(o, k) {
    if (o && k.indexOf('') >= 0) {
        const keys = k.split('.')
        keys.forEach(key => {
            o = o[key]
        })
        return o
    } else {
        return o && o[k] ? o[k] : {}
    }
}

export default {
    computed: {
        // 返回reportData属性值
        reportData() {
            // this.getReportData()可以获取到inject中的getReportData属性
            return this.getReportData()
        },
        userToday() {
            return wrapperArray(this.reportData, 'userToday')
        },
        userGrowthLastDay() {
            return wrapperArray(this.reportData, 'userGrowthLastDay')
        },
        userGrowthLastMonth() {
            return wrapperArray(this.reportData, 'userGrowthLastMonth')
        },
        salesToday() {
            // 相当于return this.reportData && this.reportData.salesToday
            return wrapperMoney(this.reportData, 'salesToday')
        },
        salesGrowthLastDay() {
            //相当于 return this.reportData && this.reportData.salesGrowthLastDay
            return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
        },
        salesGrowthLastMonth() {
            return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
        },
        salesLastDay() {
            return wrapperMoney(this.reportData, 'salesLastDay')
        },
        orderToday() {
            return wrapperNumber(this.reportData, 'orderToday')
        },
        orderLastToday() {
            return wrapperNumber(this.reportData, 'orderLastToday')
        },
        orderTrend() {
            return wrapperArray(this.reportData, 'orderTrend')
        },
        orderUser() {
            return wrapperNumber(this.reportData, 'orderUser')
        },
        returnRate() {
            return wrapperPercentage(this.reportData, 'returnRate')
        },
        orderUserTrend() {
            return wrapperArray(this.reportData, 'orderUserTrend')
        },
        orderUserTrendAxis() {
            return wrapperArray(this.reportData, 'orderUserTrendAxis')
        },
        orderFullYear() {
            return wrapperArray(this.reportData, 'orderFullYear')
        },
        orderFullYearAxis() {
            return wrapperArray(this.reportData, 'orderFullYearAxis')
        },
        orderRank() {
            return wrapperArray(this.reportData, 'orderRank')
        },
        userFullYear() {
            return wrapperArray(this.reportData, 'userFullYear')
        },
        userFullYearAxis() {
            return wrapperArray(this.reportData, 'userFullYearAxis')
        },
        userRank() {
            return wrapperArray(this.reportData, 'userRank')
        },


        // 返回reportData属性值
        wordCloud() {
            return this.getWordCloud()
        },

        category1() {
            // 同时想要直接拿到获取到category.data1.axis
            return wrapperObject(this.reportData, 'category.data1')
        },
        category2() {
            return wrapperObject(this.reportData, 'category.data2')
        },
        mapData() {
            return this.getMapData()
        }
    },
    methods: {
        format(v) {
            return format(v)
        }
    },
    // 接受外层向组件传的属性
    inject: ['getReportData', 'getWordCloud', 'getMapData']
}