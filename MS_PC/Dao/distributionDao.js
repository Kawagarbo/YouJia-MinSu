function distributionDao() {

    this.Selectcity = function(wheretext,callback) {
        //1,引入模块
        var distributionMapping = require("./distributionMapping.js");
        //2,获得对象
        var distributionmapping = new distributionMapping();
        distributionmapping.init();
        //3,查询数据
        distributionmapping.SelectcityInfo(wheretext,function(data) {
            callback(data);
        })
    };
}
module.exports = distributionDao;
