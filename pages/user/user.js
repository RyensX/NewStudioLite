// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: undefined,
    userInfo: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.data.userId = options.userId
    this.loadUserInfo()
  },
  loadUserInfo() {
    let url = `https://apis.netstart.cn/xpc/user/${this.data.userId}`
    wx.request({
      url: url,
      showLaoding: true,
      success: (res) => {
        let data = res.data.data
        console.log("成功获取用户主页信息", data)
        wx.setNavigationBarTitle({
          title: data.username,
        })
        this.setData({
          userInfo: data
        })
      }
    })
  }
})