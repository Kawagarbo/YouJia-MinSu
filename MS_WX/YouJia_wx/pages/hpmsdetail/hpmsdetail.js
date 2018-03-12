// pages/goodsdetail/goodsdetail.js
Page({
  data: {
    // banner
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    msData: null,

  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  onLoad: function (option) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/hpmsdetail',
      method: "POST",
      data: {
        hid: option.hid
      },
      header: { "Content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res.data);
        var msData = res.data;
        that.setData({
          msData: msData,
          imgUrls: msData[0].himg
        })
      }
    })
  },
})