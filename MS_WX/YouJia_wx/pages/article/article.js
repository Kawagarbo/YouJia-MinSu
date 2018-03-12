Page({
  data: {
    active_style:null,
    title:['美食','景点','城市','文化'],
    active_style:'border-bottom: 2px #FF5959 solid;',
    articlelist:null,
    imgs:null,
    pageKeys:null,
    imgUrls: [
      '../../img/6.jpg',
      '../../img/7.jpg',
      '../../img/8.jpg',
    ],
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
  onLoad: function (options) {
    var keys = "美食";
    // console.log(keys);
    this.setData({
      pageKeys: keys,
    })
    var that = this;
    var API_URL = 'http://localhost:8080/articlelist';
    wx.request({
      url: API_URL,
      data: { keywords: keys },
      header: { "Content-Type": "json" },
      success: function (res) {

        var datas = res.data;
        var $imgs = [];
        for (var i = 0; i < datas.length; i++) {
          $imgs[i] = datas[i].apic.split('&&');
          for (var j = 0; j < $imgs[i].length; j++) {
            //  $imgs[i][j] += "http://localhost:8080/";
            $imgs[i][j] = "http://localhost:8080/" + $imgs[i][j];
          }
        };
        // console.log($imgs);
        that.setData({
          articlelist: res.data,
          imgs: $imgs
        })

      }
    })
  },
  //点击查看文章详情
  articleDetailTap:function(e){
    var tid = e.currentTarget.dataset.tid;
    var cuid = e.currentTarget.dataset.cuid;
    wx.navigateTo({
      url: '../detailView/detailView?tid=' + tid+'&&'+'cuid='+cuid,
    })
  },
  chooseItem:function(e){
  var keys=e.target.dataset.keys;
  // console.log(keys);
  this.setData({
    pageKeys: e.target.dataset.keys,
  })
  var that=this;
  var API_URL = 'http://localhost:8080/articlelist';
  wx.request({
    url: API_URL,
    data: { keywords: keys },
    header: { "Content-Type": "json" },
    success: function (res) {
      var datas=res.data;
      var $imgs=[];
      for (var i = 0; i < datas.length;i++){
       $imgs[i]=datas[i].apic.split('&&');
       for (var j = 0; j < $imgs[i].length; j++) {
       //  $imgs[i][j] += "http://localhost:8080/";
         $imgs[i][j] = "http://localhost:8080/" + $imgs[i][j];
          // console.log($imgs[i][j]);
       }
      };
      // console.log($imgs);
      that.setData({
        articlelist: res.data,
         imgs:$imgs
      })
      
    }
  })
  },
  detailView:function(e){
    var tid=e.target.dataset.tid;
    var $cuid = e.target.dataset.cuid;
    // console.log(tid);
    wx.navigateTo({
      url: 'detailView?tid='+tid+'&&cuid='+$cuid,
    })
  }
})