function ForumMapping() {
    var connection;
    this.init = function() {
        //1,调用MySQL模块
        var mysql = require('mysql');

        //2，创建一个connection
        connection = mysql.createConnection({
            host: 'localhost', //主机 ip
            user: 'root', //MySQL认证用户名
            password: 'root', //MySQL认证用户密码
            port: '3306', //端口号
            database: 'minsu' //数据库里面的数据
        });
        //3,连接
        connection.connect();
    }

    this.queryAll = function(keyword, callBack) {
        //1,编写sql语句
        var articleGetSql = "SELECT * FROM  article WHERE akeywords LIKE " + "'%" + keyword + "%'";
        console.log(articleGetSql);
        //2,进行查询操作
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */

        connection.query(articleGetSql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            callBack(result);
        });
        //3,连接结束
        connection.end();
    };
    this.queryOne = function(tid, callBack) {
        //1,编写sql语句
        var getOneSql = "SELECT * FROM  article WHERE  tid=" + tid;
        console.log(getOneSql);
        //2,进行查询操作
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */

        connection.query(getOneSql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            callBack(result);
        });
        //3,连接结束
        connection.end();
    };
    this.deleteArticle = function(tid, callBack) {
        //1,编写sql语句
        var deleteSql = "DELETE FROM  article WHERE tid=" + tid;
        console.log(deleteSql);
        var updateSql = "UPDATE article set tid=tid-1 WHERE tid>" + tid;

        connection.query(deleteSql, function(err, result) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                return;
            }
            callBack(result);
        });
        connection.query(updateSql);
        //3,连接结束
        connection.end();
    }

};

module.exports = ForumMapping;
