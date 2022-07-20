//模拟服务器接口服务
export let wsx = {
  //缓存优先的TAB数据获取
  requestTab(data) {
    let key = "tabStore"
    let nowTime = Date.now()
    let getTabData = () => {
      wx.request({
        url: "https://apis.netstart.cn/xpc/home/config",
        success(res) {
          let rawData = res.data.data.tab
          rawData.shift()
          let store = {
            outTime: nowTime +
              //7天有效期
              3600 * 24 * 7 * 1000,
            data: rawData
          }
          console.log(`拉取并存储TAB数据`)
          console.log(store)
          wx.setStorage({
            key: key,
            data: store
          })
          if (data.success) {
            data.success(store)
          }
        }
      })
    }
    console.log("获取缓存", key)
    wx.getStorage({
      key: key,
      success(res) {
        let store = res.data
        console.log(`获取到TAB缓存`, store)
        if (store.outTime >= nowTime) {
          if (data.success) {
            console.log(`成功获取TAB缓存`)
            console.log(store)
            data.success({
              data: store
            })
          }
        } else {
          console.log("重新拉取TAB数据")
          getTabData()
        }
      },
      fail() {
        console.log("获取缓存失败")
        getTabData()
      }
    })

  }
}