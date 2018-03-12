function addMinSuMapping() {
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
    this.insertMinSuInfo = function(MinSuInfo, callback) {
        //插入语句
        var addMinSu = 'INSERT INTO home(htitle,hprovince,hcity,harea,haddress,Sumaddress,hphone,htype,hservetime,himg,hdetail,hkeywords,huptime,hupdatatime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        //字段的值
        var addparams = [MinSuInfo.htitle, MinSuInfo.hprovince, MinSuInfo.hcity, MinSuInfo.harea, MinSuInfo.haddress, MinSuInfo.Sumaddress, MinSuInfo.hphone, MinSuInfo.htype, MinSuInfo.hservetime, MinSuInfo.himgurl, MinSuInfo.hdetail, MinSuInfo.hkeywords, MinSuInfo.huptime, MinSuInfo.hupdatatime];
        connection.query(addMinSu, addparams, function(err, result) {
            if (err) {
                console.log(err.message);
                return;
            } else {
                callback(result);
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
module.exports = addMinSuMapping;
