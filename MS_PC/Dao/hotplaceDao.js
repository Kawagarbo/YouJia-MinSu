function hotplaceDao() {

    this.Selectplace = function(wheretext,callback) {
        //1,引入模块
        var hotplaceMapping = require("./hotplaceMapping.js");
        //2,获得对象
        var hotplacemapping = new hotplaceMapping();
        hotplacemapping.init();
        //3,查询数据
        hotplacemapping.SelectplaceInfo(wheretext,function(data) {
            callback(data);
        })
    };
}
module.exports = hotplaceDao;