function DetailsDao() {

    this.queryAll = function(tid,callback) {
        //1,引入模块
        var DetailsMapping = require("./DetailsMapping.js");
        //2,获得对象
        var detailsMapping = new DetailsMapping();
        detailsMapping.init();
        //3,查询数据
        detailsMapping.queryAll(tid,function(data) {
            callback(data);
        })
    }

}
module.exports = DetailsDao;
