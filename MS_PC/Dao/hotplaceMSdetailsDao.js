function hotplaceMSdetailsDao(){
    this.SelectInfo=function(hid,callback){
        //1,到数据库查询
        var hotplaceMSdetailsSql= require('./hotplaceMSdetailsSql');
        //2,创建checkwelfareSql对象
        var hotplacemsdetailssql=  new hotplaceMSdetailsSql();
        //3,初始化
        hotplacemsdetailssql.init();
        //4,查询数据
        hotplacemsdetailssql.SelectOneMS(hid,function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }

}
module.exports=hotplaceMSdetailsDao;

