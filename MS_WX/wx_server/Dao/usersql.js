/**
 * Created by dongyang on 2018.01.18.
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
    this.insertuserinfo = function(username, userimg, callback) {
        //插入语句
        var adduser = 'INSERT INTO user(username, userimg) VALUES(?,?)';
        //字段的值
        var addparams = [username, userimg];
        connection.query(adduser, addparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                console.log(result);
                callback(err, 'ok');
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
    this.updateuser = function(uid, userage, usersex, usertel, useremail, callback) {
        //更新语句
        var upuser = 'UPDATE user SET age=?,sex=?,usertel=?,email=? WHERE uid=?';
        //字段的值
        var upparams = [userage, usersex, usertel, useremail, uid];
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
    this.queryrankinfo = function(uid, callback) {
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
    this.queryuserinfo = function(username, callback) {
        //查询语句
        var queuser = 'SELECT * FROM user WHERE username=?';
        var queparams = [username];
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
    this.close = function() {
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = mysqlClass;
