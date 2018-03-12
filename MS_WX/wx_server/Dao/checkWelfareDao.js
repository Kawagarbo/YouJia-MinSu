function checkWelfareDao(){
    this.verification=function(callback){
        //1,到数据库查询
        var checkWelfareSql= require('./checkWelfareSql');
        //2,创建checkwelfareSql对象
        var checkWelfaresql=  new checkWelfareSql();
        //3,初始化
        checkWelfaresql.init();
        //4,查询数据
        checkWelfaresql.query(function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }
}
module.exports=checkWelfareDao;