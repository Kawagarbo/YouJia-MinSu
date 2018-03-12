//index.js
//获取应用实例
const app = getApp()

//引入city数据
var address = require('../../utils/city.js')
var animation
Page({
  data: {

    // 轮播图数据
    imgUrls: [
      "../../img/slider-bg01.jpg",
      "../../img/slider-bg02.jpg",
      "../../img/slider-bg03.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,

    //省份选择数据
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    province: '',
    city: '',
    area: '',

    // 热门导航栏数据
    navbar: ['北京', '上海', '广州', '成都', '香港','杭州','三亚','厦门'],
    hpData: ['北京市', '上海市', '广州市', '成都市', '香港', '杭州市', '三亚市','厦门市'],
    currentTab: 0,

    
    hpInfo:'',

    storyInfo:'',

    welfareInfo:'',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var hpid = this.data.currentTab+1;
    wx.request({
      url: 'http://localhost:8080/index',
      method: "POST",
      data: {
         hpid: hpid
      },
      header: { "Content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          hpInfo: res.data
        })
      }
    });

    wx.request({
      url: 'http://localhost:8080/stroyIndex',
      method: "POST",
      data: {
      },
      header: { "Content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        //  console.log(res.data);
        that.setData({
          storyInfo: res.data
        })
      }
    });

    wx.request({
      url: 'http://localhost:8080/welfareIndex',
      method: "POST",
      data: {
      },
      header: { "Content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          welfareInfo: res.data
        })
      }
    });

    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
    })
    // console.log(this.data)
  },

  // 分类 切换监听
  navbarTap: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var hpid = idx+1;
    // console.log(hpid);
    this.setData({
      currentTab: idx
    });
    wx.request({
      url: 'http://localhost:8080/index',
      method: "POST",
      data: {
        hpid: hpid
      },
      header: { "Content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          hpInfo: res.data
        })
      }
    })
  },

  //分类图片点击
  hpselectTap:function(e){
    var city = e.currentTarget.dataset.city;
    //console.log(city);
    wx.navigateTo({
      url: '../../pages/hotplace/hotplace?city=' + city,
    })
  },

  //更多城市选择搜索图标点击
  searchPlace:function(){
    var that=this;
    var value = that.data.value
    var city=that.data.citys[value[1]].name;
    wx.navigateTo({
      url: '../../pages/hotplace/hotplace?city=' + city,
    })
  },

  //故事分享点击
  stroyTap:function(e){
    var tid = e.currentTarget.dataset.tid;
    var cuid = e.currentTarget.dataset.cuid;
    wx.navigateTo({
      url: '../../pages/detailView/detailView?tid=' + tid+'&&'+'cuid='+cuid,
    })
  },

  //福利民宿点击
  welfareTap:function(e){
    var id = e.currentTarget.dataset.wid;
    wx.navigateTo({
       url: '../../pages/demo/demo?id=' + id,
    })
  },

  // 显示
  showMenuTap: function (e) {
    console.log('selectState')
    //获取点击菜单的类型 1点击状态 2点击时间 
    var menuType = e.currentTarget.dataset.type
    // 如果当前已经显示，再次点击时隐藏
    if (this.data.isVisible == true) {
      this.startAnimation(false, -200)
      return
    }
    this.setData({
      menuType: menuType
    })
    this.startAnimation(true, 0)
  },
  hideMenuTap: function (e) {
    this.startAnimation(false, -200)
  },
  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    // console.log(that.data)
  },
  // 选择状态按钮
  selectState: function (e) {
    console.log('selectState1')
    this.startAnimation(false, -200)
    var status = e.currentTarget.dataset.status
    this.setData({
      status: status
    })
    // console.log(this.data)

  },
  // 日志选择
  bindDateChange: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        begin: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == 2) {
      this.setData({
        end: e.detail.value
      })
    }
  },
  sureDateTap: function () {
    this.data.pageNo = 1
    this.startAnimation(false, -200)
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    // 如果已经显示，不在执行显示动画
    if (that.data.addressMenuIsShow) {
      return
    }
    // 执行显示动画
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    // console.log(isShow)
    var that = this
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  // 点击蒙版时取消组件的显示
  hideCitySelected: function (e) {
    // console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    // console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
      })
    }
  },
  
})
