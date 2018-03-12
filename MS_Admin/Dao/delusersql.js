/**
 * Created by dongyang on 2018.01.19.
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

    this.delteinfo = function(uid, callback) {
        //删除语句
        var deluser = 'DELETE FROM user WHERE uid=?';
        //字段的值
        var delparams = [uid];
        connection.query(deluser, delparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(err, 1);
            }
        });
        //关闭数据库
        connection.end();
    }


    this.delusers = function(dellist, callback) {
        //更新语句
        var upparams = dellist;
        var upuser = 'DELETE FROM user WHERE ' + upparams;
        //字段的值
        connection.query(upuser, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(err, 2);
            }
        });
        //关闭数据库
        connection.end();
    }

    this.close = function() {
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = mysqlClass;
