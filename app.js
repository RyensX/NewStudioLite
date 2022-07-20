// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      timeout: 6000,
    }).then((res) => {

    })

    //wx.request注入增强
    var rawReq = wx.request
    Object.defineProperty(wx, "request", {
      value: (data) => {
        //错误提示
        data.fail = data.fail ? data.fail : (e) => {
          console.log("请求错误", e)
        }
        //默认10秒
        data.timeout = data.timeout ? data.timeout : 10 * 1000
        //提供Loading
        if (data.showLaoding) {
          let rawComplete = data.complete
          data.complete = () => {
            if (rawComplete) {
              rawComplete()
            }
            wx.hideLoading({
              success: (res) => {},
            })
          }
          wx.showLoading({
            title: "正在加载",
          })
          rawReq(data)
        } else {
          rawReq(data)
        }
      },
      writable: false
    });
  },
  onError(e) {
    console.log("监测到错误", e)
  },
  globalData: {
    userInfo: null
  }
})