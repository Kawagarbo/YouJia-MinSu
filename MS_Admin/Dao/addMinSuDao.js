
function addMinSuDao() {

    this.insertAll = function(MinSuInfo,callback) {
        //1,引入模块
        var addMinSuMapping = require("./addMinSuMapping.js");
        //2,获得对象
        var addminsumapping = new addMinSuMapping();
        addminsumapping.init();
        //3,插入数据
        addminsumapping.insertMinSuInfo(MinSuInfo,function(result) {
            callback(result);
        })
    }

}
module.exports = addMinSuDao;