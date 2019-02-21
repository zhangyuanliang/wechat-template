import request from './request.js';

export default {
  // 登录
  login(data) {
    return request.post('/uc/uc/userInfo/api/v1/loginUser', data)
  },
  test(data) {
    return request.get('/uc/uc/userInfo/api/v1/test', data)
  },
}