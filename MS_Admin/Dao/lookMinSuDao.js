function lookMinSuDao() {

    this.SelectMinSu = function(callback) {
        //1,引入模块
        var lookMinSuMapping = require("./lookMinSuMapping.js");
        //2,获得对象
        var lookminsumapping = new lookMinSuMapping();
        lookminsumapping.init();
        //3,查询数据
        lookminsumapping.SelectInfo(function(data) {
            callback(data);
        })
    }

}
module.exports = lookMinSuDao;
