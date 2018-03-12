function detailMinSuDao() {

    this.SelectMinSu = function(hid,callback) {
        //1,引入模块
        var detailMinSuMapping = require("./detailMinSuMapping.js");
        //2,获得对象
        var detailminsumapping = new detailMinSuMapping();
        detailminsumapping.init();
        //3,查询数据
        detailminsumapping.SelectOneInfo(hid,function(result) {
            callback(result);
        })
    }
}
module.exports = detailMinSuDao;
