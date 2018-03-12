/**
 * Created by dongyang on 2017.12.26.
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
        //插入函数
    this.insertuser = function(name, pwd, callback) {
        //插入语句
        var adduser = 'INSERT INTO user(username,password) VALUES(?,?)';
        //字段的值
        var addparams = [name, pwd];
        connection.query(adduser, addparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                console.log(result);
                callback(err, result);
            }
        });
        //关闭数据库
        connection.end();
    }
    this.deleteuser = function(name) {
        //删除语句
        var deluser = 'DELETE FROM user WHERE username=?';
        //字段的值
        var delparams = [name];
        connection.query(deluser, delparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        //关闭数据库
        connection.end();
    }
    this.updateuser = function(name, pwd, id) {
        //更新语句
        var upuser = 'UPDATE user SET username=?,password=? WHERE uid=?';
        //字段的值
        var upparams = [name, pwd, id];
        connection.query(upuser, upparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        //关闭数据库
        connection.end();
    }
    this.queryinfo = function(callback) {
        //查询语句
        var queuser = 'SELECT * FROM user';
        connection.query(queuser, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                if (result.length == 0) {
                    // console.log(result);
                    callback(err, result);
                } else {
                    // console.log(result);
                    callback(err, result);
                }
            }
        });
    }
    this.getUserInfo = function(uid, callback) {
        //查询语句
        var getUserSql = 'SELECT * FROM user WHERE uid=' + uid;
        // console.log(getUserSql);
        connection.query(getUserSql, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            callback(result);
        });
    }
    this.close = function() {
        //关闭数据库
        connection.end();
    }
    this.queryreserveinfo = function(uid, callback) {
        //查询语句
        var querysql = 'SELECT * FROM user WHERE uid=' + uid;
        connection.query(querysql, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(result);
        });
    }
    this.close = function() {
        //关闭数据库
        connection.end();
    }
    this.queryhome = function(hid, callback) {
        //查询语句
        var querysql = 'SELECT * FROM home WHERE hid IN '+'('+hid+')';
        connection.query(querysql, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(result);
        });
    }
    this.close = function() {
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = mysqlClass;
