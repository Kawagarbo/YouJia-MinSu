function delMinSuDao() {

    this.deleteMinSu=function (keyword,callback) {
        //1,引入模块
        var delMinSuMapping = require("./delMinSuMapping.js");
        //2,获得对象
        var delminsumapping = new delMinSuMapping();
        delminsumapping.init();
        //3,
        delminsumapping.deleteInfo(keyword,function(result) {
            callback(result);
        })
    };


}
module.exports = delMinSuDao;