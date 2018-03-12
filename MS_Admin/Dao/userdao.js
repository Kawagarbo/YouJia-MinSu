/**
 * Created by dongyang on 2017.12.29.
 */
function userdao() {
    //  登录
    this.getinfo=function (callback) {
        var sqlclass=require('./usersql');
        var usersql=new sqlclass();


        usersql.init();
        usersql.queryinfo(function (err,data) {
            if(data.length==0){
                console.log("没有数据");
                callback(1);
            }
            else {
                callback(data);
            }
        });


    }
    this.getUsers=function (uid,callback) {
        var sqlclass=require('./usersql');
        //创建条件查询用户的对象
        var getUser=new sqlclass();
        getUser.init();
        //根据uid查询用户数据
        getUser.getUserInfo(uid,function(data) {
            callback(data);
        });
    }
    this.queryreserve=function (uid,callback) {
        var sqlclass=require('./usersql');
        //创建条件查询用户的对象
        var usersql=new sqlclass();
        usersql.init();
        //根据uid查询用户数据
        usersql.queryreserveinfo(uid,function(data) {
                for(var i=0;i<data.length;i++){
                   callback(data[i]);
                }
        });
    }
    this.queryhid=function (hid,callback) {
        var sqlclass=require('./usersql');
        //创建条件查询用户的对象
        var usersql=new sqlclass();
        usersql.init();
        //根据uid查询用户数据
        usersql.queryhome(hid,function(data) {
            callback(data);
        });
    }
}
module.exports=userdao;