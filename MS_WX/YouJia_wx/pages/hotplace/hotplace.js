// pages/hotplace/hotplace.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allmsInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/hotplace',
      method: "POST",
      data: {
        city: options.city
      },
      header: { "Content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        
        that.setData({
          allmsInfo: res.data,
        })
      }
    });
   
  },

 //点击跳转详情界面
  detailTap:function(e){
    var hid = e.currentTarget.dataset.hid;
    wx.navigateTo({
      url: '../../pages/hpmsdetail/hpmsdetail?hid='+hid,
    })
  }
})