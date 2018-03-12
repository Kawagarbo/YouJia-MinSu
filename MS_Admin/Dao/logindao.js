/**
 * Created by dongyang on 2018.01.18.
 */
function userdao() {
    //  登录
    this.queryad=function (username,passwd,callback) {
        var sqlclass=require('./loginsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.queryinfo(username,passwd,function (err,data) {
            if(data.length==0){
                console.log("没有数据");
                callback(1);
            }
            else {
                // console.log(data);
                callback(data);
            }
        });
    }
    this.queryuser=function (uid,callback) {
        var sqlclass=require('./loginsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.queryuserinfo(uid,function (err,data) {
            if(data.length==0){
                console.log("没有用户");
            }
            else {
                // console.log(data);
                callback(data);
            }
        });
    }
}
module.exports=userdao;