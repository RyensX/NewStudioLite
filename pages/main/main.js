import {
  wsx
} from "../../im_server/wx_server";

import Toast from '@vant/weapp/toast/toast';

// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: undefined,
    tabActive: undefined,
    tabPageData: {},
    implTemplateTabIndex: [0, 1, 3],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载TAB中',
    })
    wsx.requestTab({
      success: (res) => {
        wx.hideLoading({
          success: (res) => {},
        })
        this.setData({
          tabData: res.data.data,
          tabActive: res.data.data[1].link
        })
      }
    })
  },
  //banner文章
  goWeb(e) {
    let url = `../../pages/web/web?url=${e.currentTarget.dataset.url}`
    wx.navigateTo({
      url: url,
    })
  },
  onTabChanage(e) {
    console.log(e)
    let tabTitle = e.detail.title
    if (this.data.tabPageData[tabTitle])
      return
    let reqUrl = "https://apis.netstart.cn/xpc/" + e.detail.name
    console.log(`请求数据：${reqUrl}`)
    wx.showLoading({
      title: `加载${tabTitle}`,
      mask: true
    })
    //发起请求
    wx.request({
      url: reqUrl,
      timeout: 1000 * 10,
      success: (res) => {
        console.log(res.data)
        this.data.tabPageData[tabTitle] = res.data
        this.setDataWrapper({
          tabPageData: this.data.tabPageData
        })
      },
      fail: (e) => {
        Toast(`加载失败${e.errMsg}`)
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
  //小卡片视频点击
  onItemClick(e) {
    let url = `../../pages/play/play?id=${e.currentTarget.dataset.id}`
    console.log(`跳转视频：${url}`)
    wx.navigateTo({
      url: url,
    })
  },
  setDataWrapper(data) {
    this.setData(data)
    wx.hideLoading({
      success: (res) => {},
    })
  },
  onRecommendMenuClick(e) {
    this.setData({
      showShare: true
    })
  },
  onShareSelect(e) {
    console.log(e)
    Toast(e.detail.name)
  },
  onShareClose(e) {
    this.setData({
      showShare: false
    })
  }
})