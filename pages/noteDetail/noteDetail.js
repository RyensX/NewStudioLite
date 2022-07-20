// pages/noteDetail/noteDetail.js

import {
  timestampFormat
} from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: undefined,
    noteComment: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
  },
  loadData() {
    let url = `https://apis.netstart.cn/xpc/note/${this.options.id}`
    console.log(url)
    wx.request({
      url: url,
      showLaoding: true,
      success: (res) => {
        let data = res.data.data
        console.log("获取手记详情数据成功", data)
        data.addtime = timestampFormat(data.addtime)
        this.setData({
          detailData: data
        })
        this.loadComment()
      }
    })
  },
  loadComment() {
    let url = `https://apis.netstart.cn/xpc/note/${this.options.id}/comment`
    wx.request({
      url: url,
      success: (res) => {
        let data = res.data.data
        console.log("成功获取手记评论", data)
        this.setData({
          noteComment: data
        })
      }
    })
  },
  backNav(e) {
    wx.navigateBack({
      delta: 0,
    })
  },
  onImgClick(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.detailData.images,
    })
  }
})