function hpMinSuDao() {

    //查询当前页的六条数据
    this.Selectminsu = function(place, $page, $pagenum, callback) {
        //1,引入模块
        var hpMinSuMapping = require("./hpMinSuMapping.js");
        //2,获得对象
        var hpminsumapping = new hpMinSuMapping();
        hpminsumapping.init();
        //3,查询数据
        hpminsumapping.SelectminsuInfo(place, $page, $pagenum, function(data) {
            callback(data);
        })
    }

    //查询所有的数据
    this.selectAllData = function(wheretext, callback) {
        //1,引入模块
        var hpMinSuMapping = require("./hpMinSuMapping.js");
        //2,获得对象
        var hpminsumapping = new hpMinSuMapping();
        hpminsumapping.init();
        //3,查询数据
        hpminsumapping.SelectAllInfo(wheretext, function(data) {
            callback(data);
        })
    }

}
module.exports = hpMinSuDao;
