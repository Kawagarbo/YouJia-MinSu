/**
 * Created by dongyang on 2018.01.24.
 */
function mysqlClass() {
    var connection;
    //初始化
    this.init=function () {
        //调用mysql模块
        var mysql=require('mysql');
        connection=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            port:'3306',
            database:'minsu'
        });
        //连接数据库
        connection.connect();
    }
    //插入函数
    this.insertarticle=function(uid,title,author,content,keywords,callback) {
        //插入语句
        var adduser='INSERT INTO article(title,author,uid,acontent,akeywords) VALUES(?,?,?,?,?)';
        //字段的值
        var addparams=[title,author,uid,content,keywords];
        connection.query(adduser,addparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }else {
                // console.log(result);
                callback(err,'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
//    查询函数
    this.queryarticle=function(uid,callback) {
        //插入语句
        var adduser='SELECT * FROM article WHERE uid=?';
        //字段的值
        var addparams=[uid];
        connection.query(adduser,addparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }else {
                callback(err,result);
            }
        });
        //关闭数据库
        connection.end();
    }
    //更新
    this.updatemytxt=function(tid,title,author,content,keywords,callback) {
        //更新语句
        var upuser='UPDATE article SET title=?,author=?,acontent=?,akeywords=? WHERE tid=?';
        //字段的值
        var upparams=[title,author,content,keywords,tid];
        connection.query(upuser,upparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }else{
                callback(err,'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
//删除单条
    this.delmyart=function(tid,callback) {
        //删除语句
        var deluser='DELETE FROM article WHERE tid=?';
        //字段的值
        var delparams=[tid];
        connection.query(deluser,delparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }else {
                callback(err,'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports=mysqlClass;