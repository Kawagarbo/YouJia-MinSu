function updataMinSuDao() {

    this.selectMinSu=function (whereParameter,callback) {
            //1,引入模块
            var updataMinSuMapping = require("./updataMinSuMapping.js");
            //2,获得对象
            var updataminsumapping = new updataMinSuMapping();
        updataminsumapping.init();
            //3,
        updataminsumapping.SelectOneInfo(whereParameter,function(result) {
                callback(result);
            })
    };

    this.updataMinSu=function (newMinSuInfo,callback) {
        //1,引入模块
        var updataMinSuMapping = require("./updataMinSuMapping.js");
        //2,获得对象
        var updataminsumapping = new updataMinSuMapping();
        updataminsumapping.init();
        //3,
        updataminsumapping.updateInfo(newMinSuInfo,function(result) {
            callback(result);
        })
    }
}
module.exports = updataMinSuDao;