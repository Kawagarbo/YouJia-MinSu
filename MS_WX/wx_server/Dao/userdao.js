/**
 * Created by dongyang on 2018.01.18.
 */
function userdao() {
    //  登录
    this.queryuser = function(username, callback) {
        var sqlclass = require('./usersql');
        var usersql = new sqlclass();
        usersql.init();
        usersql.queryuserinfo(username, function(err, data) {
            if (data.length == 0) {
                callback(0);
            } else {
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    callback(data[i]);
                }
            }
        });
    }
    this.insertuser = function(username, userimg, callback) {
        var sqlclass = require('./usersql');
        var usersql = new sqlclass();
        usersql.init();
        usersql.insertuserinfo(username, userimg, function(err, data) {
            if (data == 'ok') {
                callback(data);
            } else {
                // console.log(data);
                callback('failed');
            }
        });
    }
    this.updateuserinfo = function(uid, userage, usersex, usertel, useremail, callback) {
            var sqlclass = require('./usersql');
            var usersql = new sqlclass();
            usersql.init();
            usersql.updateuser(uid, userage, usersex, usertel, useremail, function(err, data) {
                callback(data);
            });
        }
        // 查询积分
    this.queryrank = function(uid, callback) {
        var sqlclass = require('./usersql');
        var usersql = new sqlclass();
        usersql.init();
        usersql.queryrankinfo(uid, function(err, data) {
            if (data.length == 0) {
                callback(0);
            } else {
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    callback(data[i]);
                }
            }
        });
    }
}
module.exports = userdao;
