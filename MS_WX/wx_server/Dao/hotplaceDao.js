function hotplaceDao() {
    this.getHomeInfo = function(fieldname, callback) {
        var hotplaceSql = require('./hotplaceSql');
        var hotplacesql = new hotplaceSql();
        hotplacesql.init();
        hotplacesql.selectHome(fieldname, function(err, result) {
            if (err) {
                console.log(err.message);
            } else {
                callback(result);
            }
        });
    }
}
//暴露接口
module.exports = hotplaceDao;
