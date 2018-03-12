function stroyIndexDao() {
    this.getStoryInfo = function(callback) {
        var stroyIndexSql = require('./stroyIndexSql');
        var stroyindexsql = new stroyIndexSql();
        stroyindexsql.init();
        stroyindexsql.selectStroy(function(err, result) {
            if (err) {
                console.log(err.message);
            } else {
                callback(result);
            }
        });
    }
}
//暴露接口
module.exports = stroyIndexDao;
