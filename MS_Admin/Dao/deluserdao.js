/**
 * Created by dongyang on 2018.01.19.
 */
function deluserdao() {
    //  登录
    this.delteuser=function (uid,callback) {
        var sqlclass=require('./delusersql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.delteinfo(uid,function (err,data) {
            if(data==1){
                callback('ok');
            }
            else {
                console.log('删除失败');
            }
        });
    }
    this.deluserlist=function (dellist,callback) {
        var sqlclass=require('./delusersql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.delusers(dellist,function (err,data) {
            if(data==2){
                callback('ok');
            }
            else {
                console.log('删除失败');
            }
        });
    }
}
module.exports=deluserdao;