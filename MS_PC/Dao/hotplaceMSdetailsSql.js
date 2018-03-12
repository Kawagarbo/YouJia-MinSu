//查询数据
function hotplaceMSdetailsSql(){
    var connection;
    this.init=function(){
        var mysql  = require('mysql');
        //2，创建一个connection
        connection = mysql.createConnection({
            host     : 'localhost',       //主机 ip
            user     : 'root',            //MySQL认证用户名
            password : 'root',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database:'minsu'          //数据库里面的数据
        });
        //3,连接
        connection.connect();
    }

    //查询福利民宿三条信息
    this.SelectOneMS=function(hid,callback){
        //1,编写sql语句,查询所有的
        var  userGetSql = "SELECT * FROM home WHERE hid="+hid;
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }else {
                callback(err, result);
            }
        });
        //3,连接结束
        connection.end();
    }

};
module.exports=hotplaceMSdetailsSql;
