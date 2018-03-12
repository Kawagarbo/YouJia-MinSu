function checkAllArticleDao(){
    this.verification=function(callback){
        //1,到数据库查询
        var checkAllArticleSql= require('./checkAllArticleSql');
        //2,创建checkwelfareSql对象
        var checkAllArticlesql=  new checkAllArticleSql();
        //3,初始化
        checkAllArticlesql.init();
        //4,查询数据
        checkAllArticlesql.query(function(err,data){
            if(err){
                console.log(err.message);
            }else{
                callback(data);
            }
        });
    }
}
module.exports=checkAllArticleDao;