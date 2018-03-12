/**
 * Created by dongyang on 2018.01.24.
 */
function updateuserdao() {
    //  登录
    this.updateuser=function (uid,username,age,usersex,usertel,email,callback) {
        var sqlclass=require('./updateusersql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.updateuserinfo(uid,username,age,usersex,usertel,email,function (err,data) {
            if(data=='ok'){
                callback(data);
            }
            else {
                callback('failed');
            }
        });
    }
}
module.exports=updateuserdao;