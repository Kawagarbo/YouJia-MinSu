//查询数据
function checkWelfareSql() {
    var connection;
    this.init = function() {
        var mysql = require('mysql');
        //2，创建一个connection
        connection = mysql.createConnection({
            host: 'localhost', //主机 ip
            user: 'root', //MySQL认证用户名
            password: 'root', //MySQL认证用户密码
            port: '3306', //端口号
            database: 'minsu' //数据库里面的数据
        });
        //3,连接
        connection.connect();
    }
    this.query = function(callback) {
        //1,编写sql语句,查询所有的
        var userGetSql = "SELECT * FROM welfare";
        connection.query(userGetSql, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            } else {
                callback(err, result);
            }
        });
        //3,连接结束
        connection.end();
    }
};
module.exports = checkWelfareSql;
