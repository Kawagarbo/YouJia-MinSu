// pages/myarticlelist/myarticlelist.js
var linkUrl = 'http://localhost:8080/';
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  artlists:null
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
    var uid = app.globalData.userdetail.uid;
    // console.log(uid);
    wx.request({
      url: linkUrl + 'queryart',
      method: "POST",
      data: {
        uid: uid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.length==0) {
          // console.log('还没有游记');
        }else{
          // console.log(res.data);
          that.setData({
            artlists: res.data
          });
        }
      }
    });
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