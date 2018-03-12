function SelectArticleMapping() {
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

    this.queryAll = function(keywords, callBack) {
        //1,编写sql语句
        var articleGetSql = "SELECT * FROM  article WHERE akeywords LIKE " + "\"%" + keywords + "%\"";
        console.log(articleGetSql + 'kk');
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
        var articleGetSql = "SELECT * FROM  article WHERE tid= " + tid;
        console.log(articleGetSql);
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
};

module.exports = SelectArticleMapping;
