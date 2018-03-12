function CommentDao() {

    this.queryAll = function(cuid,callback) {
        //1,引入模块
        var CommentMapping = require("./CommentMapping.js");
        //2,获得对象
        var commentMapping = new CommentMapping();
        commentMapping.init();
        //3,查询数据
        commentMapping.queryAll(cuid,function(data) {
            callback(data);
        })
    };
    this.insertData=function (comment,cuid,callback) {
        //1,引入模块
        var CommentMapping = require("./CommentMapping.js");
        //2,获得对象
        var commentMapping = new CommentMapping();
        commentMapping.init();
        //3,查询数据
        commentMapping.insertData(comment,cuid,function(data) {
            callback(data);
        })
    }


}
module.exports = CommentDao;
