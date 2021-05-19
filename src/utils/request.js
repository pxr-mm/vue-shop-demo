import axios from 'axios'
import store from '@/store'
// const { baseURL } = require('@/config/net.config.js')
// import router from '@/router'
// 创建axios实例
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
const httpService = axios.create({
  baseURL: baseURL,
  timeout: 3000
})
// request拦截器
httpService.interceptors.request.use(config =>{
    console.log(config)
  if(config.url === 'login'){
      return config
  }
  config.headers.Authorization = window.sessionStorage.getItem('token')

  // config.headers[token] = store.state.token || sessionStorage.getItem('token')
  return config
})

// respone拦截器
httpService.interceptors.response.use(
  response => {
      console.log(' response', response)
    // 统一处理状态
    const res = response.data
    if (response.config.url.startsWith(baseURL)) {
      if (res.code !== 200) {
        // 需自定义
        // 返回异常
        return Promise.reject(
          new Error({
            status: res.code,
            message: res.msg
          })
        )
      } else {
        return response.data
      }
    } else {
      return response.data
    }
  },
  // 处理处理
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `未知错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    // return Promise.reject(new Error())
    return Promise.reject(error)
  }
)

export default httpService
