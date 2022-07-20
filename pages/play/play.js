// pages/play/play.js

import {
  timestampFormat,
  formatTimeSimple
} from "../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoDetail: undefined,
    videoComment: undefined,
    teams: undefined,
    tags: undefined,
    videoList: undefined,
    descShow: false,
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
    let videoDetailUrl = `https://apis.netstart.cn/xpc/article/${options.id}`
    console.log(`请求视频：${videoDetailUrl}`)
    wx.request({
      url: videoDetailUrl,
      showLaoding: true,
      success: (res) => {
        console.log(`请求视频数据成功：${videoDetailUrl}`)
        console.log(res.data)
        let data = res.data.data
        wx.setNavigationBarTitle({
          title: data.title
        })
        let vu = data.video.content.progressive[0].https_url
        console.log(`播放地址：${vu}`)
        //团队
        let teams = [data.author, ...data.team]
        console.log("团队", teams)
        console.log("标签", data.tags)
        this.setData({
          teams: teams,
          tags: data.tags,
          videoDetail: {
            videoTitle: data.title,
            videoPlayUrl: vu,
            desc: data.content,
            //TODO 遍历分类
            categories: `${data.categories[0].category_name}-${data.categories[0].sub.category_name}`,
            time: formatTimeSimple(new Date(data.publish_time * 1000)),
            countLike: data.count.count_like,
            countView: data.count.count_view,
            countComment: data.count.count_comment,
            countCollect: data.count.count_collect,
            countShare: data.count.count_share,
          }
        })
        //加载相似视频
        this.loadLikeVideo(options.id)
      }
    })
  },
  loadLikeVideo(id) {
    let url = `https://apis.netstart.cn/xpc/article/${id}/next`
    console.log("获取相似视频", url)
    wx.request({
      url: url,
      success: (res) => {
        console.log("成功获取相似视频", res.data)
        this.setData({
          videoList: res.data.data.list
        })
      }
    })
  },
  onCreatorClick(e) {
    let id = e.currentTarget.dataset.userid
    let url = `../user/user?userId=${id}`
    console.log("打开个人页", url)
    wx.navigateTo({
      url: url,
    })
  },
  share() {
    console.log("分享视频")
    this.setData({
      showShare: true
    })
  },
  onChange(e) {
    console.log(e)
    if (this.data.videoComment)
      return
    //懒加载
    switch (e.detail.index) {
      case 1:
        //评论
        let url = `https://app.xinpianchang.com/comments?resource_id=${this.options.id}`
        console.log(`获取评论：${url}`)
        wx.request({
          url: url,
          success: (res) => {
            let comm = res.data.data.list
            //逐个格式化日期
            comm.forEach((item) => {
              item.addDate = timestampFormat(item.addtime)
            })
            this.setData({
              videoComment: comm
            })
          }
        })
        break
      default:
    }
  },
  onVideoClick(e) {
    let url = `../../pages/play/play?id=${e.currentTarget.dataset.id}`
    console.log(`跳转视频：${url}`)
    wx.navigateTo({
      url: url,
    })
  },
  onDescClick(e) {
    console.log(e)
    this.setData({
      descShow: !this.data.descShow
    })
  },
  onTagClick(e) {
    console.log(e)
    let kw = e.currentTarget.dataset.tabname
    let url = `../searchDetail/searchDetail?keyword=${kw}`
    console.log("跳转搜索", url)
    wx.navigateTo({
      url: url,
    })
  },
  onShareClose(e) {
    this.setData({
      showShare: false
    })
  }
})