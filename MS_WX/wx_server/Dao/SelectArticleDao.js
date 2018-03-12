function SelectArticleDao() {

  this.queryAll = function (keywords, callback) {
    //1,引入模块
    var SelectArticleMapping = require("./SelectArticleMapping.js");
    //2,获得对象
    var selectArticleMapping = new SelectArticleMapping();
    selectArticleMapping.init();
    //3,查询数据
    selectArticleMapping.queryAll(keywords, function (data) {
      callback(data);
    })
  };
  this.queryOne = function (tid, callback) {
    //1,引入模块
    var SelectArticleMapping = require("./SelectArticleMapping.js");
    //2,获得对象
    var selectArticleMapping = new SelectArticleMapping();
    selectArticleMapping.init();
    //3,查询数据
    selectArticleMapping.queryOne(tid, function (data) {
      callback(data);
    })
  };
}
module.exports = SelectArticleDao;
