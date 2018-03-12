/**
 * Created by dongyang on 2018.01.18.
 */
function userdao() {
    //  登录
    this.queryuser=function (username,pwd,callback) {
        var sqlclass=require('./loginsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.queryuserinfo(username,pwd,function (err,data) {
            if(data.length==0){
                callback('none');
            }
            else {
                // console.log(data);
                callback(data);
            }
        });
    }
}
module.exports=userdao;