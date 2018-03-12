//更新积分表数据
function updateRankSql() {
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
    this.update = function(userid, rank, wid, callback) {
        //1,更新数据库的文章id和积分
        var userModSql = 'UPDATE user SET rank=?,wid=? WHERE uid=' + userid;
        var userModSql_Params = [rank, wid];
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
module.exports = updateRankSql;
