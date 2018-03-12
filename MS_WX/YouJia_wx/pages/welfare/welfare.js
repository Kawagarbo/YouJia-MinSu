Page({
  data: {
    imgUrls: [
      '../../img/little-monster.png',
      '../../img/012.jpg',
      '../../img/013.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 3000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  onLoad: function (options) {
    var that = this;
    var API_URL = "http://localhost:8080/welfaredata";
    wx.request({
      url: API_URL,
      data: {id:options.id},
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {     
        that.setData({
          welfare: res.data
        })
      }
    })
  },

  //点击查看详情
  welfaerDetailTap:function(e){
    var id = e.currentTarget.dataset.wid;
    console.log(id);
    wx.navigateTo({
      url: '../../pages/demo/demo?id=' + id,
    })
  }

})