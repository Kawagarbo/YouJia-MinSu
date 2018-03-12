function checkAllWelfareDao(){
    this.verification=function(size,length,callback){
        //1,到数据库查询
        var checkAllWelfareSql= require('./checkAllWelfareSql');
        //2,创建checkwelfareSql对象
        var checkAllWelfaresql=  new checkAllWelfareSql();
        //3,初始化
        checkAllWelfaresql.init();
        //4,查询数据
        checkAllWelfaresql.query(size,length,function(err,data){
            if(err){
                console.log(err.message);
                console.log(666)
            }else{
                callback(data);
            }
        });
    }
}
module.exports=checkAllWelfareDao;