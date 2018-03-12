function checkoneWelfareDao(){
    this.verification=function(id,callback){
        //1,到数据库查询
        var checkoneWelfareSql = require('./checkoneWelfareSql');
        //2,创建checkwelfareSql对象
        var checkoneWelfaresql =  new checkoneWelfareSql();
        //3,初始化
        checkoneWelfaresql.init();
        //4,查询数据
        checkoneWelfaresql.query(id,function(result){
               callback(result);
        });
    }
}
module.exports=checkoneWelfareDao;