import request from '../utils/request2'
export function wordcloud() {
    // 如果是发生get请求用params传params:{a:1}，如果是post将params换成data
    return request({
        url: '/screen/wordcloud',
        method: 'get'
    })
}
export function mapScatter() {
    return request({
        url: '/screen/map/scatter',
        method: 'get'
    })
}

export function screenData() {
    return request({
        url: '/screen/data',
        method: 'get'
    })
}