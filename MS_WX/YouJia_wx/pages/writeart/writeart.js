// pages/writeart/writeart.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  writeart: function (e) {
    var linkUrl = 'http://localhost:8080/';
    var uid = app.globalData.userdetail.uid;
    var login = app.globalData.userInfo;
    var upuser = e.detail.value;
    console.log(upuser);
    var title = upuser.title;
    var author = upuser.author;
    var content = upuser.content;
    var keyword = upuser.keyword;
    // console.log(title, author, content, keyword);
    if (!title | !author | !content | !keyword) {
      wx.showToast({
        title: '内容不完整',
        icon: 'loading',
        duration: 500
      });
      return;
    } else {
      wx.request({
        url: linkUrl + 'writeart',
        method: "POST",
        data: {
          uid: uid,
          title: title,
          author: author,
          content: content,
          keyword: keyword
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data);
          if (res.data=='ok'){
             wx.redirectTo({
               url: '../myarticlelist/myarticlelist',
             });
          }
        }
      });
    }
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