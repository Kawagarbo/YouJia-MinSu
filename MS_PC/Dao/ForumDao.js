function ForumDao() {

    this.queryAll = function(keyword,callback) {
        //1,引入模块
        var ForumMapping = require("./ForumMapping.js");
        //2,获得对象
        var forumMapping = new ForumMapping();
        forumMapping.init();
        //3,查询数据
        forumMapping.queryAll(keyword,function(data) {
            callback(data);
        })
    };
    this.queryOne = function(tid,callback) {
        //1,引入模块
        var ForumMapping = require("./ForumMapping.js");
        //2,获得对象
        var forumMapping = new ForumMapping();
        forumMapping.init();
        //3,查询数据
        forumMapping.queryOne(tid,function(data) {
            callback(data);
        })
    }
    this.deleteArticle=function (tid,callback) {
        //1,引入模块
        var ForumMapping = require("./ForumMapping.js");
        //2,获得对象
        var forumMapping = new ForumMapping();
        forumMapping.init();
        //3,查询数据
        forumMapping.deleteArticle(tid,function(data) {
            callback(data);
        })
    }
}
module.exports = ForumDao;
