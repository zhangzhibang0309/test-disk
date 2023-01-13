import request from './request'

export function loginApi(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logoutApi() {
  return request({
    url: '/user/logout',
    method: 'get',
  })
}


export function getCodeApi(data) {
  return request({
    url: '/common/sendCode',
    method: 'get',
    params: data
  })
}

export function signupApi(data) {
  return request({
    url: '/user/signup',
    method: 'post',
    data
  })
}