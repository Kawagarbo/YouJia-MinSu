function welfareIndexSql() {
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

    this.selectWelfare = function(callback) {
        //查询语句
        var queuser = 'SELECT * FROM welfare LIMIT 2';
        //字段的值
        connection.query(queuser, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                if (result.length == 0) {
                    // console.log(result);
                    callback(err, result);
                } else {

                    //console.log(result);
                    callback(err, result);
                }
            }
        });
    }
    this.close = function() {
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = welfareIndexSql;
