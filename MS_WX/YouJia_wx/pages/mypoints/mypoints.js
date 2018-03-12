// pages/mypoints/mypoints.js
const app=getApp();
var linkUrl = 'http://localhost:8080/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  user:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that=this;
    var user=app.globalData.userdetail;
    if (user){
      var uid = user.uid;
      // console.log(uid);
      wx.request({
        url: linkUrl + 'queryinfo',
        method: "POST",
        data: {
          uid: uid,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          // console.log(res.data);
          that.setData({
            user:res.data
          })
        }
      });
    }
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