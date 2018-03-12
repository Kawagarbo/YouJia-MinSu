/**
 * Created by dongyang on 2018.01.24.
 */
function mysqlClass() {
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
    this.updateuserinfo = function(uid, username, age, usersex, usertel, email, callback) {
        //更新语句
        var upuser = 'UPDATE user SET username=?,age=?,sex=?,usertel=?,email=? WHERE uid=?';
        //字段的值
        var upparams = [username, age, usersex, usertel, email, uid];
        connection.query(upuser, upparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(err, 'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = mysqlClass;
