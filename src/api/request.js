import axios from 'axios'

import Cookies from 'js-cookie'

/**
 * @description axios初始化
 */
const service = axios.create({
  baseURL: 'http://42.193.113.124:8888', //基本路径，
  // baseURL: 'http://192.168.163.173:8888',
  // baseURL: 'http://localhost:8888/',
  timeout: 500000, //超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    let token = Cookies.get('token')
    if (token) {
      config.headers.token = token // 让每个请求携带自定义token 请根据实际情况自行修改
      // console.log(config)
      // 接口加入用户数据
    }
    // console.log(config)
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
// response 拦截器
// 可以在接口响应后统一处理结果
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 201
    // console.log('response', res);
    // 获取错误信息
    const msg = res.data.msg || '接口请求异常'
    if (code == 200) {
      return res.data
    } else if (code == 201) {
      return res
    } else {
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    console.log('error', error)
    let {
      message
    } = error
    if (message == 'Network Error') {
      message = 'Network Error'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    return Promise.reject(error)
  }
)

export default service
