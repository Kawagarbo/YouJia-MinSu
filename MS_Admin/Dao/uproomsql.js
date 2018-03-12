/**
 * Created by dongyang on 2018.02.05.
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
    this.upuhidinfo = function(newhid,uid,callback) {
        //更新语句
        var upuser = 'UPDATE user SET hid=? WHERE uid=?';
        var upnum=[newhid,uid];
        //字段的值
        connection.query(upuser,upnum,function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }else{
                callback(err,'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
    this.queryroom = function(hid,callback) {
        //更新语句
        var queryuser = 'SELECT * FROM home WHERE hid='+hid;
        //字段的值
        connection.query(queryuser, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }else{
                callback(result);
            }
        });
        //关闭数据库
        connection.end();
    }
    this.uproomnum = function(newroomnumer,hid,callback) {
        //更新语句
        var uprooms = 'UPDATE home SET roomnumber=? WHERE hid=?';
        var upnum=[newroomnumer,hid];
        //字段的值
        connection.query(uprooms,upnum,function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }else{
                callback('ok');
            }
        });
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = mysqlClass;