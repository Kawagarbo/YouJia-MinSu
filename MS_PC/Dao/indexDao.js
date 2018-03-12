function indexDao(){
    this.SelectInfo_1=function(callback){
        //1,到数据库查询
        var indexSql= require('./indexSql');
        //2,创建checkwelfareSql对象
        var indexsql=  new indexSql();
        //3,初始化
        indexsql.init();
        //4,查询数据
        indexsql.SelectWelfare(function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }
    this.SelectInfo_2=function(callback){
        //1,到数据库查询
        var indexSql= require('./indexSql');
        //2,创建checkwelfareSql对象
        var indexsql=  new indexSql();
        //3,初始化
        indexsql.init();
        //4,查询数据
        indexsql.SelectArticle(function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }
}
module.exports=indexDao;
