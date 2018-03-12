function pushartdao() {
    //  登录
    this.insertart=function (uid,title,author,content,keywords,callback) {
        var sqlclass=require('./pushartsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.insertarticle(uid,title,author,content,keywords,function (err,data) {
              if(data=='ok'){
                  callback(data);
              }
        });
    }
    //查询我的游记
    this.querytext=function (uid,callback) {
        var sqlclass=require('./pushartsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.queryarticle(uid,function (err,data) {
               callback(data);
        });
    }
    //更新单篇游记
    this.updateart=function (tid,title,author,content,keywords,callback) {
        var sqlclass=require('./pushartsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.updatemytxt(tid,title,author,content,keywords,function (err,data) {
            if(data=='ok'){
                callback(data);
            }
        });
    }
//删除游记
    this.delart=function (tid,callback) {
        var sqlclass=require('./pushartsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.delmyart(tid,function (err,data) {
            if(data=='ok'){
                callback(data);
            }else {
                callback('failed');
            }
        });
    }

}
module.exports=pushartdao;