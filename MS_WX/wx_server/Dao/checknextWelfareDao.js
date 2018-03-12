function checknextWelfareDao(){
    this.verification=function(callback){
        //1,到数据库查询
        var checknextWelfareSql= require('./checknextWelfareSql');
        //2,创建checkwelfareSql对象
        var checknextWelfaresql=  new checknextWelfareSql();
        //3,初始化
        checknextWelfaresql.init();
        //4,查询数据
        checknextWelfaresql.query(function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }
}
module.exports=checknextWelfareDao;