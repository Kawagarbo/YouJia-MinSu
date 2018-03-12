Page({
  data: {
    iconSize: [20],
    iconColor: [
      'orange'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel'
    ],
    imgUrls:"",
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
    var id=options.id;
    var that = this;
    var API_URL = "http://localhost:8080/welfaredetail";
    wx.request({
      url: API_URL,
      data: {id:id},
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          welfare: res.data,
          id:id,  
          imgUrls: res.data[0].whpic       
        })
        // console.log(res.data[0].whpic  )
      }
    })
  }

})