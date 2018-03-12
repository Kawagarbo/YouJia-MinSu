var express = require('express');
var app = new express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('views engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(session({
    secret: '123',
    name: 'express-pro', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 1000 * 5 }, //24h  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
//全局变量session
var adsession;
//index
app.get('/index', function(req, res) {
    if (!adsession) {
        res.render('ad_login', {});
    } else {
        res.render('index', { res: adsession });
    }
});
app.get('/ad_login', function(req, res) {

    res.render('ad_login', {});
});

//登录
app.post('/logins', urlencodedParser, function(req, res) {
    var username = req.body.username;
    var pwd = req.body.passwd;
    var md5 = crypto.createHash('md5');
    var passwd = md5.update(pwd).digest('hex');
    console.log(username, pwd);
    var loginDao = require('./Dao/logindao');
    var logindao = new loginDao();
    logindao.queryad(username, passwd, function(result) {
        if (result == 1) {
            res.json({ res: 'failed' });
            res.end();
        } else {
            for (var i = 0; i < result.length; i++) {
                req.session.admin = result[i];
                adsession = req.session.admin;
                // console.log(adsession.aid);
            }
            res.json({ res: 'ok' });
            res.end();
        }
    });
});

//预约管理界面
app.get('/ad_tocancel', function(req, res) {
    if (!adsession) {
        res.render('ad_login', {});
    } else {
        var uid=req.query.uid;
        // console.log(uid);
        var userDao = require('./Dao/userdao');
        var userdao = new userDao();
        userdao.queryreserve(uid,function (result) {
            // console.log(username);
            if(result.hid==''){
                res.render('ad_tocancel', { res: adsession,username:result,data:''});
            }else{
              var hid=result.hid;
              userdao.queryhid(hid,function (data) {
                  // console.log(data);
                  res.render('ad_tocancel', { res: adsession,username:result,data:data});
              });
            }
        });
    }
});

//取消预约
app.post('/cancelhome', urlencodedParser, function(req, res) {
    var hid = req.body.hid;
    var uid = req.body.uid;
    // console.log(hid);
    var userDao = require('./Dao/userdao');
    var userdao = new userDao();
    userdao.queryreserve(uid,function (data) {
        var oldhid=data.hid;
        var newarr=oldhid.split(',');
        for(var i=0;i<newarr.length;i++){
            if(newarr[i]==hid){
                newarr.splice(i,1);
            }
        }
        // console.log(newarr);
        var newhid=newarr.join(',');
        // console.log(typeof newhid);
        var uproomDao=require('./dao/uproomdao');
        var uproomdao=new uproomDao();
        uproomdao.upuhid(newhid,uid,function (result) {
          if(result=='ok'){
              uproomdao.querynum(hid,function (roomnum) {
                  // console.log(roomnum.roomnumber);
                  var newroomnumer=roomnum.roomnumber+1;
                  // console.log(newroomnumer);
                  uproomdao.uproom(newroomnumer,hid,function (upres) {
                      if(upres=='ok'){
                          res.json('ok');
                          res.end();
                      }else{
                          res.json('failed');
                          res.end();
                      }
                  })
              })
          }else{
              res.json('failed');
              res.end();
          }
        });
    });
});

//删除用户
app.post('/deluser', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    var deluserDao = require('./Dao/deluserdao');
    var deluserdao = new deluserDao();
    deluserdao.delteuser(uid, function(data) {
        if (data == 'ok') {
            res.json(data);
            res.end();
        }
    });
});

//批量删除
app.post('/dellist', urlencodedParser, function(req, res) {
    var dellist = req.body.dellist;
    dellist = 'uid IN (' + dellist + ')';
    console.log(dellist);
    var deluserDao = require('./Dao/deluserdao');
    var deluserdao = new deluserDao();
    deluserdao.deluserlist(dellist, function(data) {
        if (data == 'ok') {
            res.json(data);
            res.end();
        }
    });
});

//获取修改用户信息
app.get('/ad_upuserinfo', function(req, res) {
    if (!adsession) {
        res.render('ad_login', {});
    } else {
        var uid = req.query.uid;
        var loginDao = require('./Dao/logindao');
        var logindao = new loginDao();
        logindao.queryuser(uid, function(result) {
            // console.log(result);
            res.render('ad_upuserinfo', { data: result, res: adsession });
        });
    }
});
//提交修改用户信息
app.post('/upuserinfo', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    var username = req.body.username;
    var userage = req.body.userage;
    var usersex = req.body.usersex;
    var usertel = req.body.usertel;
    var useremail = req.body.useremail;
    var userrank = req.body.userrank;
    console.log(uid, username, userage, usersex, usertel, useremail, userrank);
    var upuserDao = require('./Dao/upuserdao');
    var upuserdao = new upuserDao();
    upuserdao.upuserinfo(uid, username, userage, usersex, usertel, useremail, userrank, function(result) {
        // console.log(result);
        if (result == 'ok') {
            res.json(result);
            res.end();
        }
    });
});
// 退出登录
app.get('/clearse', function(req, res) {
    adsession = '';
    res.json({ res: 'ok' });
    res.end();
});

//用户信息表
app.get('/ad_userinfo', function(req, res) {
    if (!adsession) {
        res.render('ad_login', {});
    } else {
        var userDao = require('./Dao/userdao');
        var userdao = new userDao();
        userdao.getinfo(function(result) {
            res.render('ad_userinfo', { res: adsession, userinfo: result });
        });
    }
});

/*论坛文章查看*/
app.get('/forum', function(req, res) {
    //1,引入模块
    var ForumDao = require("./Dao/ForumDao.js");
    //2,创建对象
    var forumDao = new ForumDao();
    //3,获得数据
    forumDao.queryAll(function(forumData) {
        if (!adsession) {
            res.render('ad_login', {});
        } else {
            res.render('forum', {
                res: adsession,
                forumData: forumData
            });
        }
    })
});
//点击查看文章详情
app.get('/details', function(req, res) {
    //1,引入模块
    var DetailsDao = require("./Dao/DetailsDao.js");
    //2,创建对象
    var detailsDao = new DetailsDao();
    var tid = req.query.tid;
    console.log(tid);
    //3,获得数据
    detailsDao.queryAll(tid, function(detailsData) {
        //1,引入模块
        var uid = req.query.uid;
        console.log(uid);
        //查询用户信息
        var UserDao = require("./Dao/userdao.js");
        var userDao = new UserDao();
        //传入uid
        userDao.getUsers(uid, function(userData) {
            //获取评论信息
            var cuid = req.query.cuid;
            console.log(cuid);
            var CommentDao = require("./Dao/CommentDao.js");
            var commentDao = new CommentDao();
            commentDao.queryComment(cuid, function(commentData) {
                res.render('details', {
                    detailsData: detailsData,
                    userData: userData,
                    commentData: commentData,
                    res: adsession
                })
            });
        })
    });
});
//删除文章
app.get('/deleteArticle', function(req, res) {
    var tid = req.query.tid;
    var ForumDao = require('./Dao/ForumDao.js');
    var forumDao = new ForumDao();
    forumDao.deleteArticle(tid, function(result) {
        if (result) {
            res.json({ res: 'ok' });
            res.end();
        }
    })
});
//查看所有民宿
app.get('/lookMinSu', function(req, res) {
    var lookMinSuDao = require('./Dao/lookMinSuDao.js');
    var lookminsudao = new lookMinSuDao();
    lookminsudao.SelectMinSu(function(result) {
        if (!adsession) {
            res.render('ad_login', {});
        } else {
            res.render('lookMinSu', {
                res: adsession,
                minsudata: result,
            });
        }
    });
});

//添加民宿
app.get('/addMinSu', function(req, res) {
    if (!adsession) {
        res.render('ad_login', {});
    } else {
        res.render('addMinSu', { res: adsession });
    }
});
app.post('/addMinSu', urlencodedParser, function(req, res) {
    var MinSuInfo = {
        htitle: req.body.htitle,
        hprovince: req.body.hprovince,
        hcity: req.body.hcity,
        harea: req.body.harea,
        haddress: req.body.haddress,
        Sumaddress: req.body.Sumaddress,
        hphone: req.body.hphone,
        htype: req.body.htype,
        hservetime: req.body.hservetime,
        himgurl: req.body.himgurl,
        hdetail: req.body.hdetail,
        hkeywords: req.body.hkeywords,
        huptime: req.body.huptime,
        hupdatatime: req.body.hupdatatime,
    }
    var addMinSuDao = require('./Dao/addMinSuDao.js');
    var addminsudao = new addMinSuDao();
    addminsudao.insertAll(MinSuInfo, function(result) {
        if (result) {
            res.json({ res: 'ok' });
            res.end();
        }
    });
});

//修改民宿
app.get('/updataMinSu', function(req, res) {
    var hid = req.query.hid;
    //console.log(req.query.hid);
    var updataMinSuDao = require('./Dao/updataMinSuDao.js');
    var updataminsudao = new updataMinSuDao();
    updataminsudao.selectMinSu(hid, function(result) {
        res.render('updataMinSu', {
            res: adsession,
            Data: result
        });
    });
});
app.post('/updataMinSu', urlencodedParser, function(req, res) {
    var newMinSuInfo = {
        hid: req.body.hid,
        htitle: req.body.htitle,
        hprovince: req.body.hprovince,
        hcity: req.body.hcity,
        harea: req.body.harea,
        haddress: req.body.haddress,
        Sumaddress: req.body.Sumaddress,
        hphone: req.body.hphone,
        htype: req.body.htype,
        hservetime: req.body.hservetime,
        himgurl: req.body.himgurl,
        hdetail: req.body.hdetail,
        hupdatatime: req.body.hupdatatime,
    }
    var updataMinSuDao = require('./Dao/updataMinSuDao.js');
    var updataminsudao = new updataMinSuDao();
    updataminsudao.updataMinSu(newMinSuInfo, function(result) {
        if (result) {
            res.json({ res: 'ok' });
            res.end();
        }

    });
});

//删除民宿
app.post('/delMinSu', urlencodedParser, function(req, res) {
    var hid = req.body.hid;
    var delMinSuDao = require('./Dao/delMinSuDao.js');
    var delminsudao = new delMinSuDao();
    delminsudao.deleteMinSu(hid, function(result) {
        if (result) {
            res.json({ res: 'ok' });
            res.end();
        }
    });
});

//查看一条民宿详情
app.get('/lookdetail', function(req, res) {

    var hid = req.query.hid;
    var detailMinSuDao = require('./Dao/detailMinSuDao.js');
    var detailminsudao = new detailMinSuDao();
    detailminsudao.SelectMinSu(hid, function(result) {

        //分割图片地址字符串
        var strimgUrl = result[0].himg;
        var arrimgUrl = [];
        arrimgUrl = strimgUrl.split(" ");

        res.render('lookdetail', {
            res: adsession,
            minsudata: result,
            minsuIMG: arrimgUrl
        });
    });
});



//添加福利民宿
app.post('/welfare', urlencodedParser, function(req, res) {
    var addwelfareSql = require('./Dao/addwelfareSql');
    var addwelfaresql = new addwelfareSql();
    var whpic = req.body.whpic;
    var whtitle = req.body.whtitle;
    var waddress = req.body.waddress;
    var wreceptiontime = req.body.wreceptiontime;
    var whostphone = req.body.whostphone;
    var whrank = req.body.whrank;
    var wdeadline = req.body.wdeadline;
    var wkeywords = req.body.wkeywords;
    var whdet = req.body.whdet;
    addwelfaresql.init();
    addwelfaresql.inserUser(whtitle, whdet, whpic, waddress, wreceptiontime, whostphone, whrank, wdeadline, wkeywords, function(result) {
        if (result == true) {
            res.json({ res: "ok" });
            res.end();
        } else {
            console.log('add filed');
        }
    });
});
// 添加福利民宿信息界面
app.get('/welfare', function(req, res) {
    if (!adsession) {
        res.render('ad_login', {});
    } else {
        res.render('welfare', { res: adsession });
    }
});
//查看所有的民宿信息
app.get('/allwelfare', function(req, res) {
    var checkWelfareDao = require('./Dao/checkWelfareDao');
    var checkwelfareDao = new checkWelfareDao();
    checkwelfareDao.verification(function(result) {
        if (!adsession) {
            res.render('ad_login', {});
        } else {
            res.render('allwelfare', {
                data: result,
                res: adsession
            });
        }
    })
});
//删除福利民宿
app.post('/delate', urlencodedParser, function(req, res) {
    var delateWelfareSql = require('./Dao/delateWelfareSql');
    var delateWelfaresql = new delateWelfareSql();
    delateWelfaresql.init();
    var id = req.body.whid;
    delateWelfaresql.query(id, function(err, result) {
        if (result) {
            console.log("yes")
            res.json({ res: "ok" });
            res.end();
        } else {
            console.log("fail")
        }
    })
});
//查看福利民宿详细的信息
app.get('/welfare_detail', function(req, res) {
    var checkWelfareDetailDao = require('./Dao/checkWelfareDetailDao');
    var checkWelfareDetaildao = new checkWelfareDetailDao();
    var id = req.query.wid;
    checkWelfareDetaildao.verification(id, function(result) {
        if (result) {
            res.render('welfare_detail', {
                thisdata: result,
                res: adsession
            });
            res.end();

        } else {
            console.log("fail")
        }
    });
});
//修改福利民宿信息原来的信息获取，修改之后跳转到修改后的界面
app.get('/changeWelfare', function(req, res) {
    var checkWelfareDetailDao = require('./Dao/checkWelfareDetailDao');
    var checkWelfareDetaildao = new checkWelfareDetailDao();
    var id = req.query.wid;
    checkWelfareDetaildao.verification(id, function(result) {
        if (result) {
            res.render('changeWelfare', {
                orgindata: result,
                res: adsession
            });
            res.end();
        }
    })
});
//修改后的界面，修改之后更新数据库
app.post("/changesuccess", urlencodedParser, function(req, res) {
    var data = {
            id: req.body.whid,
            whpic: req.body.whpic,
            whtitle: req.body.whtitle,
            waddress: req.body.waddress,
            wreceptiontime: req.body.wreceptiontime,
            whostphone: req.body.whostphone,
            whrank: req.body.whrank,
            wdeadline: req.body.wdeadline,
            wkeywords: req.body.wkeywords,
            whdet: req.body.whdet,
        }
        // var id=req.body.whid;
    var updateWelfareSql = require('./Dao/updateWelfareSql');
    var updateWelfaresql = new updateWelfareSql();
    updateWelfaresql.init();
    updateWelfaresql.update(data, function(result) {
        if (result) {
            res.json({ res: "ok" });
            res.end();
        } else {
            console.log('change filed');
        }
    });
})
var server = app.listen(8088);
