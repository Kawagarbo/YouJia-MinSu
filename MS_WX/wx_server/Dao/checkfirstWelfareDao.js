function checkfirstWelfareDao(){
    this.verification=function(callback){
        //1,到数据库查询
        var checkfirstWelfareSql= require('./checkfirstWelfareSql');
        //2,创建checkwelfareSql对象
        var checkfirstWelfaresql=  new checkfirstWelfareSql();
        //3,初始化
        checkfirstWelfaresql.init();
        //4,查询数据
        checkfirstWelfaresql.query(function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }
}
module.exports=checkfirstWelfareDao;