function updataMinSuMapping() {
    var connection;
    //初始化
    this.init = function() {
        //调用mysql模块
        var mysql = require('mysql');
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'minsu'
        });
        //连接数据库
        connection.connect();
    }
    this.deleteInfo = function(keyword, callback) {
        //删除语句
        var delSql = 'DELETE FROM home WHERE hid=?';
        //字段的值
        var delparams = [keyword];
        connection.query(delSql, delparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(result)
        });
        //关闭数据库
        connection.end();
    }

}
//暴露接口
module.exports = updataMinSuMapping;
