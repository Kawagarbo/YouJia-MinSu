//更新数据
function updateWelfareSql() {
    var connection;
    this.init = function() {
        var mysql = require('mysql'); //调用MySQL模块
        connection = mysql.createConnection({
            host: 'localhost', //主机 ip
            user: 'root', //MySQL认证用户名
            password: 'root', //MySQL认证用户密码
            port: '3306', //端口号
            database: 'minsu' //数据库里面的数据
        });
        //2,连接
        connection.connect();
    }
    this.update = function(data, callback) {
        //1,编写sql语句
        var userModSql = 'UPDATE welfare SET whtitle = ?,whdet = ?,whpic=?,waddress=?,wreceptiontime=?,whostphone=?,whrank=?,wdeadline=?,wkeywords=? WHERE wid =' + data.id;
        var userModSql_Params = [data.whtitle, data.whdet, data.whpic, data.waddress, data.wreceptiontime, data.whostphone, data.whrank, data.wdeadline, data.wkeywords];
        //5，更新操作
        connection.query(userModSql, userModSql_Params, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            } else {
                callback(result);
            }
        });
        //5,连接结束
        connection.end();
    }
}
module.exports = updateWelfareSql;
