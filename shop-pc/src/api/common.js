// 公用接口方法定义在这里
import request from '@/utils/request'

// post-demo
// export function login(data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }
// get-demo
// export function getInfo(token) {
//   return request({
//     url: '/info',
//     method: 'get',
//     params: { token }
//   })
// }
// baseURL-demo
// export function login(data) {
//   return request({
//     url: '/api/1.0/manager/login',
//     method: 'post',
//     data,
//     baseURL: '/mock'
//   })
// }
// 
// upload-文件流-demo
// export function uploadNew(data) {
//   return request({
//     url: '/upload/new',
// 		 method: 'post',
//     data,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     transformRequest: [function(data) {
//       return data  
//     }]		
//   })
// }

//登录
export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data   
  })
}
//退出
export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}
//获取用户信息
export function getInfo() {
  return request({
    url: 'userInfo',
    method: 'post'
  })
}
//获取路由
export function getRoutes() {
  return request({
    url: 'userMenu',
    method: 'post'
  })
}