//修改后的界面
function changeWelfareSql() {
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
    this.inserUser = function(whtitle, whdet, whpic, waddress, wreceptiontime, whostphone, whrank, wdeadline, wkeywords, callback) {
        //1,编写sql语句
        var userAddSql = 'INSERT INTO welfare(whtitle,whdet,whpic,waddress,wreceptiontime,whostphone,whrank,wdeadline,wkeywords) VALUES(?,?,?,?,?,?,?,?,?)';
        var userAddSql_Params = [whtitle, whdet, whpic, waddress, wreceptiontime, whostphone, whrank, wdeadline, wkeywords];
        connection.query(userAddSql, userAddSql_Params, function(err, result) {
            if (result) {
                callback(true)
            } else {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }

        });
        //5,连接结束
        connection.end();
    }

}
module.exports = changeWelfareSql;
