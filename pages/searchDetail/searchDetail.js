// pages/searchDetail/searchDetail.js

let page = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: undefined,
    tags: undefined,
    videoList: undefined,
    searchTotal: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //可预设搜索词
    console.log("预设搜索", options.keyword, options)
    this.search({
      detail: options.keyword
    })
    //热门搜索
    wx.request({
      url: "https://apis.netstart.cn/xpc/search/recommend_kws",
      success: (res) => {
        this.setData({
          tags: res.data.data.list
        })
      }
    })
  },
  loadData() {
    let url = `https://apis.netstart.cn/xpc/search?kw=${this.data.keyword}`
    wx.request({
      url: url,
      showLaoding: true,
      success: (res) => {
        let data = res.data.data.list
        console.log("获取搜索结果成功", data)
        this.setData({
          videoList: data,
          searchTotal: res.data.data.total
        })
      }
    })
  },
  search(e) {
    console.log(e)
    let kw = e.detail
    if (kw && kw != '') {
      console.log("搜索", kw)
      this.setData({
        keyword: kw
      })
      this.loadData()
    }
  },
  onVideoClick(e) {
    let url = `../../pages/play/play?id=${e.currentTarget.dataset.id}`
    console.log(`跳转视频：${url}`)
    wx.navigateTo({
      url: url,
    })
  },
  onTagClick(e) {
    console.log(e)
    let kw = e.currentTarget.dataset.tabname
    this.search({
      detail: kw
    })
  },
  back(e) {
    if (this.data.videoList) {
      this.setData({
        videoList: null
      })
    } else
      wx.switchTab({
        url: "../search/search",
      })
  }
})