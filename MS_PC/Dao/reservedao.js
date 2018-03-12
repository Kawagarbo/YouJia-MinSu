function reserverdao() {
    //  查看用户预定
    this.queryhid = function(uid, callback) {
        var sqlclass = require('./reservesql');
        var usersql = new sqlclass();
        usersql.init();
        usersql.queryuserhid(uid, function(err, data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    callback(data[i]);
                }
            } else {
                callback(0);
            }
        });
    }
    this.touserhid = function(hid, uid, callback) {
            var sqlclass = require('./reservesql');
            var usersql = new sqlclass();
            usersql.init();
            usersql.touserinfo(hid, uid, function(err, data) {
                callback(data);
            });
        }
        // 更新房间数
    this.uproom = function(roomnumber, hid, callback) {
            var sqlclass = require('./reservesql');
            var usersql = new sqlclass();
            usersql.init();
            usersql.uproominfo(roomnumber, hid, function(err, data) {
                callback(data);
            });
        }
        // 查询预定的民宿
    this.queryroom = function(hid, callback) {
        var sqlclass = require('./reservesql');
        var usersql = new sqlclass();
        usersql.init();
        usersql.queryroominfo(hid, function(err, data) {
            callback(data);
        });
    }
}
module.exports = reserverdao;
