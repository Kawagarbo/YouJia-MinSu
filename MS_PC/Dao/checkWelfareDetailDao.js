function checkWelfareDetailDao(){
    this.verification=function(id,callback){
        //1,到数据库查询
        var checkWelfareDetailSql = require('./checkWelfareDetailSql');
        //2,创建checkwelfareSql对象
        var checkWelfareDetailsql =  new checkWelfareDetailSql();
        //3,初始化
        checkWelfareDetailsql.init();
        //4,查询数据
        checkWelfareDetailsql.query(id,function(result){
            callback(result);
        });
    }
}
module.exports=checkWelfareDetailDao;