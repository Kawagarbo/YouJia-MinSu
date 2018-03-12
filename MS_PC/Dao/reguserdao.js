/**
 * Created by dongyang on 2018.01.28.
 */
function reguserdao() {
    //  查询存在与否
    this.finduser=function (username,callback) {
        var sqlclass=require('./regusersql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.queryuserinfo(username,function (err,data) {
           callback(data);
        });
    }
//    注册
    this.insertuser=function (username,passwd,usertel,callback) {
        var sqlclass=require('./regusersql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.insertuserinto(username,passwd,usertel,function (err,data) {
            if(data=='ok') {
                callback(data);
            }else{
                callback('failed');
            }
        });
    }
}
module.exports=reguserdao;