function welfareIndexDao() {
    this.getWelfareInfo = function(callback) {
        var welfareIndexSql = require('./welfareIndexSql');
        var welfareindexsql = new welfareIndexSql();
        welfareindexsql.init();
        welfareindexsql.selectWelfare(function(err, result) {
            if (err) {
                console.log(err.message);
            } else {
                callback(result);
            }
        });
    }
}
//暴露接口
module.exports = welfareIndexDao;
