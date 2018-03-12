// pages/myinfo/myinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  focus:false
  },
  upuserinfo:function(e){
   var linkUrl = 'http://localhost:8080/';
  //  console.log(e);
   var uid=app.globalData.userdetail.uid;
   var upuser=e.detail.value;
   console.log(upuser);
   var userage = upuser.userage;
   var usersex=upuser.sex;
   var usertel=upuser.usertel;
   var useremail = upuser.useremail;
   console.log(userage, usersex, usertel, useremail);
   if (!userage | !usersex | !usertel | !useremail){
       wx.showToast({
       title: '资料未完整',
       icon: 'loading',
       duration: 500
     });
    //  this.setData({
    //    focus: true
    //  });
     return;
   }else{
     wx.request({
       url: linkUrl + 'updateinfo',
       method: "POST",
       data: {
         uid: uid,
         userage: userage,
         usersex: usersex,
         usertel: usertel,
         useremail: useremail
       },
       header: {
         "content-type": "application/x-www-form-urlencoded"
       },
       success: function (res) {
         if(res.data=='ok'){
           console.log(res.data);
           wx.switchTab({
             url: '../person/person'
           })
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