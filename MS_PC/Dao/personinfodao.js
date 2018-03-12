function personinfodao() {
    //  查找该用户
    this.findinfo=function (uid,callback) {
        var sqlclass=require('./personinfosql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.finduserinfo(uid,function (err,data) {
            if(data.length==0){
                console.log('没有用户');
            }
            else {
                callback(data);
            }
        });
    }
    //查找该用户之外的其它用户
    this.findother=function (uid,username,callback) {
        var sqlclass=require('./personinfosql');
        var usersql=new sqlclass();
        usersql.init();
        usersql.findotherinfo(uid,function (err,data) {
            if(data.length==0){
                console.log('没有相同其它用户，可以修改');
                callback(0);
            }
            else {
                var j=0;
                for(var i=0;i<data.length;i++) {
                        //这里要修改为查询除了我之外的所有人的用户名，不能有相同的。有才加一，没有重复都为0；
                        if (data[i].username == username) {
                            j++;
                        }
                    }
                callback(j);
            }
        });
    }
}
module.exports=personinfodao;