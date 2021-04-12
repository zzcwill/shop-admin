const { jscode2session } = require('./api/index.js')

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.info(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        jscode2session(
          {
            data: {
              code: res.code,
            }
          },
          (res2) => {
            console.info(res2.data)
          }
        )
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
