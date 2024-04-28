// 通过npm i axios -S来安装axios
import axios from 'axios'

const service = axios.create({
    // 若需要接入防盗版接口接入apis
    // baseURL: 'https://apis.imooc.com'
    baseURL: 'https://book.youbaobao.xyz:18082/',
    timeout: 500
})

service.interceptors.response.use(
    // 请求成功
    response => {
        // console.log(response)
        if (response.status === 200 && response.data) {
            return response.data
        } else {
            return Promise.reject(new Error('请求失败'))
        }
    },
    // 异常
    error => {
        return Promise.reject(error)
    }
)
export default service