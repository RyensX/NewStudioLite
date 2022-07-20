// pages/note/note.js

import {
  timestampFormat
} from "../../utils/util"

let page = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notes: undefined, //[{}],
    showShare: false,
    options: [{
        name: '微信',
        icon: 'wechat',
        openType: 'share'
      },
      {
        name: '微博',
        icon: 'weibo'
      },
      {
        name: '复制链接',
        icon: 'link'
      },
      {
        name: '分享海报',
        icon: 'poster'
      },
      {
        name: '二维码',
        icon: 'qrcode'
      },
    ],
    contentShow: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
  },
  onPullDownRefresh() {
    page = 1
    this.data.notes = undefined
    this.loadData()
  },
  onReachBottom(e) {
    this.loadData()
  },
  loadData() {
    let url = `https://apis.netstart.cn/xpc/notes?page=${page}`
    console.log("加载手记数据", url)
    wx.request({
      url: url,
      showLaoding: true,
      success: (res) => {
        let data = res.data.data
        console.log("成功获取手记数据", data)
        let now = Date.now()
        data.list.forEach((v) => {
          v.addtime = timestampFormat(v.addtime)
        })
        let dataArr = this.data.notes ? this.data.notes : []
        dataArr.push(...data.list)
        console.log("合成数据", dataArr)
        this.setData({
          notes: dataArr
        })
        page++
      },
      fail: (e) => {
        console.log("加载失败", e.errMsg)
      },
      complete: () => {
        wx.stopPullDownRefresh({
          success: (res) => {},
        })
      }
    })
  },
  onNoteItemClick(e) {
    console.log(e)
    let url = `../../pages/noteDetail/noteDetail?id=${e.currentTarget.dataset.id}`
    console.log(`跳转手记详情：${url}`)
    wx.navigateTo({
      url: url,
    })
  },
  onNoteItemMenuClick(e) {
    console.log(e)
    this.setData({
      showShare: true
    })
  },
  onShareClose(e) {
    this.setData({
      showShare: false
    })
  },
  onImgClick(e) {
    let index = e.currentTarget.dataset.index
    let images = this.data.notes[index].images
    console.log(e, index, images)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: images,
    })
  },
  onContentClick(e) {
    let value = this.data.contentShow[e.currentTarget.dataset.id]
    console.log("当前文本折叠状态", value, e.currentTarget.dataset.id)
    if (value) {
      this.data.contentShow[e.currentTarget.dataset.id] = false
    } else {
      this.data.contentShow[e.currentTarget.dataset.id] = true
    }
    this.setData({
      contentShow: this.data.contentShow
    })
  }
})