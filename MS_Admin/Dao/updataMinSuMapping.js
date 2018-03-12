function updataMinSuMapping() {
    var connection;
    //初始化 连接数据库
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

    // 查询一条民宿信息语句
    this.SelectOneInfo = function(whereParameter, callBack) {
        //1,编写sql语句
        var SelectMinSuSql = "SELECT * FROM  home WHERE hid=?";

        //字段的值
        var upparams = [whereParameter];
        //2,进行查询操作
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */

        connection.query(SelectMinSuSql, upparams, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            callBack(result);
        });
        //3,连接结束
        connection.end();
    }

    //修改民宿信息语句
    this.updateInfo = function(newMinSuInfo, callBack) {
        //更新语句
        var updateSql = 'UPDATE home SET htitle=?,hprovince=?,hcity=?,harea=?,haddress=?,Sumaddress=?,hphone=?,htype=?,hservetime=?,himg=?,hdetail=?,hupdatatime=? WHERE hid=?';
        //字段的值
        var upparams = [newMinSuInfo.htitle, newMinSuInfo.hprovince, newMinSuInfo.hcity, newMinSuInfo.harea, newMinSuInfo.haddress, newMinSuInfo.Sumaddress, newMinSuInfo.hphone, newMinSuInfo.htype, newMinSuInfo.hservetime, newMinSuInfo.himgurl, newMinSuInfo.hdetail, newMinSuInfo.hupdatatime, newMinSuInfo.hid];
        connection.query(updateSql, upparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            callBack(result);
        });
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports = updataMinSuMapping;
