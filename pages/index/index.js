//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    link:[
      "奥摩",
      "飞狐",
      "黑鹰",
      "暗夜"
    ]

  },
  onLoad: function () {
    //后台请求
  },
  formQuery(e){
    console.log(e);
    let search = e.detail.value.q;
    wx.navigateTo({
      url: '/pages/index/list?q=' + search
    })
  }
})
