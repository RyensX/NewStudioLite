// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //TODO 暂时简单实现
    console.log(options)
    let data = JSON.parse(decodeURIComponent(options.data))
    console.log("收到分类数据", data)

    wx.setNavigationBarTitle({
      title: data.data.category_name
    })

    let url = `https://apis.netstart.cn/xpc/articles?category_id=${data.id}`
    wx.request({
      url: url,
      showLaoding: true,
      success: (res) => {
        let data = res.data.data.list
        this.setData({
          videoList: data
        })
      }
    })
  },
  onVideoClick(e) {
    let url = `../../pages/play/play?id=${e.currentTarget.dataset.id}`
    console.log(`跳转视频：${url}`)
    wx.navigateTo({
      url: url,
    })
  },
})