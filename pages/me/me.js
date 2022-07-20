// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: "点击登录",
      avatarUrl: "../../static/icons/user.png"
    },
    actions: [{
      icon: "../../static/icons/public.png",
      title: "发布公开作品",
      desc: "分享你的个人作品"
    }, {
      icon: "../../static/icons/private.png",
      title: "上传私密视频",
      desc: "加密分享，高清播放"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  login() {
    console.log("请求用户数据")
    wx.getUserProfile({
      desc: '登陆新片场小程序',
      success: (result) => {
        console.log(result)
        this.setData({
          userInfo: result.userInfo
        })
      }
    })
  },
  scan(e) {
    wx.scanCode({
      onlyFromCamera: true,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})