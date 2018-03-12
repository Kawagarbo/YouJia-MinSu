function hpmsdetailDao() {
    this.getOneInfo = function(fieldname, callback) {
        var hpmsdetailSql = require('./hpmsdetailSql');
        var hpmsdetailsql = new hpmsdetailSql();
        hpmsdetailsql.init();
        hpmsdetailsql.selectOnems(fieldname, function(err, result) {
            if (err) {
                console.log(err.message);
            } else {
                callback(result);
            }
        });
    }
}
//暴露接口
module.exports = hpmsdetailDao;
