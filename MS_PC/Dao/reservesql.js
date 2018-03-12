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
        //插入函数
    this.touserinfo = function(hid, uid, callback) {
        //插入语句
        var adduser = 'UPDATE user SET hid=? WHERE uid=?';
        //字段的值
        var addparams = [hid, uid];
        connection.query(adduser, addparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                // console.log(result);
                callback(err, 'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
    this.uproominfo = function(roomnumber, hid, callback) {
        //更新语句
        var upuser = 'UPDATE home SET roomnumber=? WHERE hid=?';
        //字段的值
        var upparams = [roomnumber, hid];
        connection.query(upuser, upparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(err, 'yes');
            }
        });
        //关闭数据库
        connection.end();
    }
    this.queryuserhid = function(uid, callback) {
        //查询语句
        var queuser = 'SELECT * FROM user WHERE uid=?';
        var queparams = [uid];
        connection.query(queuser, queparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(err, result);
            }
        });
        connection.end();
    }
    this.queryroominfo = function(hid, callback) {
        //查询语句
        var queuser = 'SELECT * FROM home WHERE hid IN '+'('+hid+')';
        connection.query(queuser,function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(err, result);
            }
        });
        connection.end();
    }
}
//暴露接口
module.exports = mysqlClass;
