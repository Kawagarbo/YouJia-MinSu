
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active_style: null,
    tid:null,
    cuid:null,
    inputValue: null,
    imgUrls: null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    var $tid = options.tid;
    var $cuid = options.cuid;
    // console.log($tid);
    this.setData({ tid: $tid,cuid:$cuid });

    var that = this;
    var API_URL = 'http://localhost:8080/detailView';
    wx.request({
      url: API_URL,
      data: { tid: $tid, cuid: $cuid},
      header: { "Content-Type": "json" },
      success: function (res) {
        var datas = res.data.data;
        // console.log(res.data);
        var $imgs = [];
       
          $imgs =datas[0].apic.split('&&');
          for (var j = 0; j < $imgs.length; j++) {
            $imgs[j] = "http://localhost:8080/" + $imgs[j];
        };
 
        that.setData({
          commentData: res.data.commentData,
          detailist: res.data.data,
          imgUrls:$imgs
        })
      }
    })
  },
  bindKeyInput: function (e) {
    var value = e.detail.value;
    this.setData({
      inputValue:value
    })
  },
  send:function(e){
    var $comment = this.data.inputValue;
    // console.log($comment);
    var $cuid=e.target.dataset.cuid;
    // console.log($cuid);
    var that = this;
    var API_URL = 'http://localhost:8080/commentList';
    wx.request({
      url: API_URL,
      data: { comment: $comment,cuid:$cuid },
      header: { "Content-Type": "json" },
      success: function (res) {
       if(res.result='ok'){
         wx.showToast({
           title: '评论成功',
           icon: 'success',
           duration: 2000
         })  
        // console.log('okokokok');
       }

      }
    })
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