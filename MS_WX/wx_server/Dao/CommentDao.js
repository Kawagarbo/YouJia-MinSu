function CommentDao() {
    this.queryComment = function(cuid, callback) {
        //1,引入模块
        var CommentMapping = require("./CommentMapping.js");
        //2,获得对象
        var commentMapping = new CommentMapping();
        commentMapping.init();
        //3,查询数据
        commentMapping.queryComment(cuid, function(data) {
            callback(data);
        })
    };

    this.insertOne = function(cuid, comment, callback) {
        //1,引入模块
        var CommentMapping = require("./CommentMapping.js");
        //2,获得对象
        var commentMapping = new CommentMapping();
        commentMapping.init();
        //3,查询数据
        commentMapping.insertOne(cuid, comment, function(data) {
            callback(data);
        })
    };

}
module.exports = CommentDao;
