/**
 * Created by dongyang on 2018.01.24.
 */
function querytxtdao() {
    //  查询该篇文章
    this.querytxt=function (tid,callback) {
        var sqlclass=require('./querytxtsql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.querythis(tid,function (err,data) {
            if(data.length>0){
                for(var i=0;i<data.length;i++){
                    callback(data[i]);
                }
            }
        });
    }
}
module.exports=querytxtdao;