// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var that = this;
    // console.log(e);
    var username = e.detail.userInfo.nickName;
    var userimg = e.detail.userInfo.avatarUrl;
    // console.log(username, userimg);
    var queryUrl = 'http://localhost:8080/wxuser';
    // 查询用户是否存在，不存在则添加用户信息。
    wx.request({
      url: queryUrl,
      method: "POST",
      data: {
        username: username,
        userimg: userimg
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
          // console.log(res.data);
          app.globalData.userdetail = res.data;
      }
    });
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (app.globalData.userInfo) {
    //   // console.log(app.globalData.userInfo);
    //   var that = this;
    //   var username = app.globalData.userInfo.nickName;
    //   var userimg = app.globalData.userInfo.avatarUrl;
    //   var queryUrl = 'http://localhost:8080/data';
    //   // 查询用户是否存在，不存在则添加用户信息。
    //   wx.request({
    //     url: queryUrl,
    //     method: "POST",
    //     data: {
    //       username: username,
    //       userimg: userimg
    //     },
    //     header: {
    //       "content-type": "application/x-www-form-urlencoded"
    //     },
    //     success: function (res) {
    //       var resuser = res.data;
    //       // console.log(resuser);
    //       var wid = resuser.userid;
    //       app.globalData.wid = wid;
    //       that.setData({
    //         usermsg: resuser
    //       })
    //     }
    //   });
    // } else {
    //   console.log("没有授权");
    // }
  },
  toartlist:function(){
  wx.navigateTo({
    url: '../myarticlelist/myarticlelist'
  })
  },
  toreserve: function () {
    wx.navigateTo({
      url: '../myreserve/myreserve'
    })
  },
  topoints: function () {
    wx.navigateTo({
      url: '../mypoints/mypoints'
    })
  },
  toweal: function () {
    wx.navigateTo({
      url: '../myweal/myweal'
    })
  },
  tomyinfo: function () {
    wx.navigateTo({
      url: '../myinfo/myinfo'
    })
  },
  towriteart: function () {
    wx.navigateTo({
      url: '../writeart/writeart'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})