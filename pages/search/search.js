// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: undefined,
    recommends: undefined,
    categories: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
  },
  loadData() {
    wx.request({
      url: "https://apis.netstart.cn/xpc/page/discovery",
      showLaoding: true,
      success: (res) => {
        let data = res.data.data
        console.log("成功获取探索数据", data)
        this.setData({
          //banner
          banners: data.banners,
          //菜单
          recommends: data.recommended_position,
          //分类
          categories: data.categories
        })
      },
      fail: (e) => {
        console.log("载入探索数据失败", e.errMsg)
      }
    })
  },
  goSearch(e) {
    wx.navigateTo({
      url: "../searchDetail/searchDetail",
    })
  },
  onSearchCategoryAllClick(e) {
    this.goCategory({
      id: 0,
      data: {
        category_name: "全部"
      }
    })
  },
  onSearchCategoryClick(e) {
    this.goCategory({
      id: e.currentTarget.dataset.id,
      data: this.data.categories[e.currentTarget.dataset.index]
    })
  },
  goCategory(data) {
    wx.navigateTo({
      url: `../category/category?data=${encodeURIComponent(JSON.stringify(data))}`,
    })
  },
  goWeb(e) {
    let url = `../../pages/web/web?url=${e.currentTarget.dataset.url}`
    wx.navigateTo({
      url: url,
    })
  },
})