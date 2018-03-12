function indexDao() {
    this.getHpInfo = function(fieldname, callback) {
        var selectHotPlaceInfo = require('./indexSql');
        var selecthotplaceinfo = new selectHotPlaceInfo();
        selecthotplaceinfo.init();
        selecthotplaceinfo.selectHp(fieldname, function(err, result) {
            if (err) {
                console.log(err.message);
            } else {
                callback(result);
            }
        });
    }
}
//暴露接口
module.exports = indexDao;
