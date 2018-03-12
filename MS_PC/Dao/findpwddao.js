/**
 * Created by dongyang on 2018.01.29.
 */
function userdao() {
    //  验证用户是否存在
    this.lostquery=function (username,usertel,callback) {
        var sqlclass=require('./findpwdsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.lostqueryuser(username,usertel,function (err,data) {
            if(data.length==0){
                callback(data);
            }
            else {
                for(var i=0;i<data.length;i++){
                    callback(data[i]);
                }
            }
        });
    }
    //设置新密码
    this.resetpwd=function (passwd,uid,callback) {
        var sqlclass=require('./findpwdsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.uplostuserpwd(passwd,uid,function (err,data) {
                callback(data);
        });
    }
}
module.exports=userdao;