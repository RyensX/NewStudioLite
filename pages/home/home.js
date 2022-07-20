import {
  wsx
} from "../../im_server/wx_server";

const app = getApp()

let videoContext;
let vid;

Page({
  data: {
    //播放视频数据
    videoList: undefined
  },
  onLoad() {
    vid = "video_0";
    videoContext = wx.createVideoContext(vid, this);
  },
  onShow() {
    //请求视频数据
    this.setData({
      videoList: wsx.request({
        url: "im_server/videos"
      }).data
    })
  },
  onPullDownRefresh(){
    //TODO 获取乱序数据显示差异
    this.onShow()
    wx.stopPullDownRefresh()
  },
  onVideoClick() {

  },
  bindSwiper(e) {
    console.log(e)
    let vidt = `video_${e.detail.current}`
    if (vidt !== vid && videoContext) {
      //videoContext.stop();
      videoContext.pause();
      console.log(`停止video:${vidt}`)
    }
    vid = vidt;
    videoContext = wx.createVideoContext(vidt, this);
    videoContext.play()
    console.log(`播放video:${vid}`)
  }
})