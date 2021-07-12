import axios from 'axios'
// 通过局部引入方式引入 Element 的 Message 组件功能
import { Message } from 'element-ui'

const baseURL="http://139.196.142.213:3000";

const request = axios.create({
  baseURL
})

// //请求拦截器
// request.interceptors.request.use(function (config) {
//   config.baseUrl = 'http://localhost:3000'
//   return config
// })

//响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是未收到响应
    Message.error('请求超时，请重试')
  } else {
    // 意料之外的错误
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
