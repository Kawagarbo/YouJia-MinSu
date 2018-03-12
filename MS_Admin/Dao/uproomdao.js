function uproomdao() {
    //  登录
    this.upuhid=function (newhid,uid,callback) {
        var sqlclass=require('./uproomsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.upuhidinfo(newhid,uid,function (err,data) {
              callback(data);
        });
    }
    this.querynum=function (hid,callback) {
        var sqlclass=require('./uproomsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.queryroom(hid,function (data) {
            for(var i=0;i<data.length;i++){
                callback(data[i]);
            }
        });
    }
    this.uproom=function (newroomnumer,hid,callback) {
        var sqlclass=require('./uproomsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.uproomnum(newroomnumer,hid,function (result) {
            // console.log(result);
            callback(result);
        });
    }
}
module.exports=uproomdao;