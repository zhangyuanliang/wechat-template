import { 
  BASE_URL,
  defaultTimeout 
} from '../utils/constant.js'
var Fly = require("flyio/dist/npm/wx.js") //wx.js为flyio的微信小程序入口文件
const request = new Fly()

request.config.baseURL = BASE_URL
request.config.timeout = defaultTimeout

request.interceptors.request.use((request) => {
  const token = wx.getStorageSync('X-Token')
  if (token) {
    request.headers['X-Token'] = token
  }
  wx.showLoading({ title: '加载中...' })
  return request
})

request.interceptors.response.use(
  res => {
    wx.hideLoading()
    if (res.data) {
      switch (res.data.code) {
        case 2000:
        case 2001:
          wx.showToast({
            title: '你的账号已在其它的设备上登录',
            icon: 'none',
            duration: 2000,
            success: function () {
              wx.clearStorageSync();
              wx.redirectTo({
                url: '/pages/login/login'
              })
            },
            fail: function () {
              wx.clearStorageSync()
            }
          })
          wx.clearStorageSync()
          break;
        case 1000:
        case 1:
          wx.clearStorageSync()
          wx.showToast({ title: res.data.msg })
          return Promise.reject(res.data)
        default:
          break;
      }
    }
    return res.data
  },
  (err) => {
    wx.hideLoading()
    return promise.resolve(err)
  }
)

export default request