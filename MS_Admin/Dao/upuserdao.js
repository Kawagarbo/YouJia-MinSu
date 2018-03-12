/**
 * Created by dongyang on 2018.01.19.
 */
function upuserdao() {
    //  登录
    this.upuserinfo=function (uid,username,userage,usersex,usertel,useremail,userrank,callback) {
        var sqlclass=require('./upusersql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.updateuser(uid,username,userage,usersex,usertel,useremail,userrank,function (err,data) {
            if(data==1){
                callback('ok');
            }else{
                callback('failed');
            }
        });
    }
}
module.exports=upuserdao;