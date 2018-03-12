var express = require('express');
var app = new express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('views engine', 'ejs');
app.set('views', __dirname + '/view');
var crypto = require('crypto');
// session设置
app.use(session({
    secret: '123',
    name: 'express-pro', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 1000 * 5 }, //24h  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));


//首页
app.get('/index', function(req, res) {
    var indexDao = require('./Dao/indexDao.js');
    var indexdao = new indexDao();
    indexdao.SelectInfo_1(function(welfareData) {
        var welfareImg = [];
        for (var i = 0; i < welfareData.length; i++) {
            var wimgArr = welfareData[i].whpic.split(' ');
            welfareImg[i] = wimgArr;
        }
        indexdao.SelectInfo_2(function(articleData) {
            //console.log(result2);
            var articleImg = [];
            for (var i = 0; i < articleData.length; i++) {
                var aimgArr = articleData[i].apic.split('&&');
                articleImg[i] = aimgArr;
            }
            console.log(articleData[0].tid);
            res.render('index', {
                userse: usersession,
                welfareData: welfareData,
                welfareImg: welfareImg,
                articleData: articleData,
                articleImg: articleImg,
            });
        })
    });
});
//热门目的地
app.get('/hotplace', function(req, res) {
    var place = "'" + req.query.place + "'";
    var hotplaceDao = require('./Dao/hotplaceDao.js');
    var hotplacedao = new hotplaceDao();
    hotplacedao.Selectplace(place, function(result) {
        var hpMinSuDao = require('./Dao/hpMinSuDao.js');
        var hpminsudao = new hpMinSuDao();
        //查询所有的数据
        hpminsudao.selectAllData(place, function(allData) {

            //每页显示多少条记录
            $pagenum = 6;

            //总页数
            $nums = allData.length;
            $totalpage = $nums / $pagenum;
            //console.log($totalpage);

            //当前页
            var $page = req.query.$page;
            //当前页数不能大于总页数
            if ($page > $totalpage) {
                $page = $totalpage;
            }
            //当前页数不能小于1
            if ($page < 1) {
                $page = 1;
            }
            //console.log($page);
            //查询当前页的六条数据
            hpminsudao.Selectminsu(place, $page, $pagenum, function(minsuData) {
                //console.log(minsuData);
                var Arr1 = [];
                for (var i = 0; i < minsuData.length; i++) {
                    // console.log(minsuData[i].himg);
                    var imgstr = minsuData[i].himg;
                    var MSimgArr = imgstr.split(' ');
                    for (var j = 0; j < MSimgArr.length; j++) {
                        MSimgArr[j] = 'http://localhost:8088/' + MSimgArr[j];
                    }
                    Arr1[i] = MSimgArr;
                }
                res.render('hotplace', {
                    userse: usersession,
                    hotPlace: result,
                    minsuData: minsuData,
                    $page: $page,
                    $totalpage: $totalpage,
                    Arr1: Arr1,
                    $totalpage: $totalpage,
                });
            })
        });
    });
});
//热门目的地省市搜索
app.get('/distribution', function(req, res) {
    var city = "'" + req.query.city + "'";
    var distributionDao = require('./Dao/distributionDao.js');
    var distributiondao = new distributionDao();
    distributiondao.Selectcity(city, function(result) {
        var Arr1 = [];
        for (var i = 0; i < result.length; i++) {

            var imgstr = result[i].himg;
            var MSimgArr = imgstr.split(' ');

            for (var j = 0; j < MSimgArr.length; j++) {
                MSimgArr[j] = 'http://localhost:8088/' + MSimgArr[j];
            }
            Arr1[i] = MSimgArr;
        }
        res.render('distribution', {
            userse: usersession,
            minsuData: result,
            Arr1: Arr1,
        });
    });
});

//民宿详细
app.get('/hotplaceMSdetails', function(req, res) {
    var hid = req.query.hid;
    var hotplaceMSdetailsDao = require('./Dao/hotplaceMSdetailsDao.js');
    var hotplacemsdetailsdao = new hotplaceMSdetailsDao();
    hotplacemsdetailsdao.SelectInfo(hid, function(OneMSdata) {
        // console.log(OneMSdata);
        var himgStr = OneMSdata[0].himg;
        var himgArr = himgStr.split(' ');
        for (var i = 0; i < himgArr.length; i++) {
            himgArr[i] = 'http://localhost:8088/' + himgArr[i];
        }
        // console.log(himgArr);
        res.render('hotplaceMSdetails', {
            OneMSdata: OneMSdata,
            himgArr: himgArr,
            userse: usersession
        });
    });
});


//福利主页福利民宿展示和论坛文章展示
app.get('/welfareindex', function(req, res) {
        var size = 1;
        var length = 5;
        //用到session的地方要判断是否有session,没有就设置为空
        // //福利民宿信息
        var checkAllWelfareDao = require('./Dao/checkAllWelfareDao.js');
        var checkAllWelfaredao = new checkAllWelfareDao();
        checkAllWelfaredao.verification(size, length, function(welfare) {
            //论坛文章信息
            var checkAllArticleDao = require('./Dao/checkAllArticleDao.js');
            var checkAllArticledao = new checkAllArticleDao();
            checkAllArticledao.verification(function(article) {
                //
                if (!usersession) {
                    res.render('welfareindex', {
                        userse: "",
                        //福利民宿的数据
                        data: welfare,
                        //论坛文章的数据
                        articledata: article
                    });
                } else {
                    res.render('welfareindex', {
                        userse: usersession,
                        //福利民宿的数据
                        data: welfare,
                        //论坛文章的数据
                        articledata: article
                    });
                }
            })
        })
    })
    //滚轮事件触发的时候获取变量改变数据库的查询实现懒加载
app.get('/ajaxWelfareindex', function(req, res) {
        var size = req.query.size;
        console.log("size:" + size)
        var length = req.query.thislength;
        console.log("length:" + length)
            //福利民宿信息
        var checkAllWelfareDao = require('./Dao/checkAllWelfareDao');
        var checkAllWelfaredao = new checkAllWelfareDao();
        checkAllWelfaredao.verification(size, length, function(welfare) {
            res.write(JSON.stringify(welfare));
            res.end();
        })
    })
    //在福利民宿里面积分兑换之后更新到数据库
app.post('/rank', urlencodedParser, function(req, res) {
    var rank = req.body.successrank;
    var wid = req.body.wid;
    var userid = req.body.userid
    var updateRankSql = require('./Dao/updateRankSql');
    var updateRanksql = new updateRankSql();
    updateRanksql.init();
    updateRanksql.update(userid, rank, wid, function(result) {
        if (result) {
            res.json({ res: "ok" });
            res.end();
        } else {
            console.log('change filed');
        }
    });
});

// 查看详细信息页面
app.get('/welfaredetail', function(req, res) {

    var checkWelfareDetailDao = require('./Dao/checkWelfareDetailDao');
    var checkWelfareDetaildao = new checkWelfareDetailDao();
    var wid = req.query.wid;
    checkWelfareDetaildao.verification(wid, function(result) {
        //多张图片分割得到数组
        var strimgUrl = result[0].whpic;
        // console.log(strimgUrl)
        var arrimg = [];
        arrimg = strimgUrl.split(" ");
        //设施
        var facility = result[0].facility;
        var arrfacility = [];
        arrfacility = facility.split(" ");
        if (!usersession) {

            res.render('welfaredetail', {
                userse: "",
                Alldata: result,
                imgArr: arrimg,
                facility: arrfacility
            });
            res.end();
        } else {
            res.render('welfaredetail', {
                userse: usersession,
                Alldata: result,
                imgArr: arrimg,
                facility: arrfacility
            });
            res.end();
        }
    });
});

//故事模块
app.get('/forum', function(req, res) {

    var ForumDao = require("./Dao/ForumDao.js");
    var forumDao = new ForumDao();
    var keyword = '美食';

    forumDao.queryAll(keyword, function(forumData) {
        res.render('forum', {
            userse: usersession,
            forumData: forumData
        });
    });
});
//分栏显示
app.get('/forumItem', function(req, res) {
    var ForumDao = require("./Dao/ForumDao.js");
    var forumDao = new ForumDao();
    var keyword = req.query.keywords;

    forumDao.queryAll(keyword, function(datas) {
        res.write(JSON.stringify(datas));
        res.end();
    });
});
//详情
app.get('/detailsView', function(req, res) {

    var ForumDao = require("./Dao/ForumDao.js");
    var forumDao = new ForumDao();
    var tid = req.query.tid;

    forumDao.queryOne(tid, function(detailData) {
        var CommentDao = require("./Dao/CommentDao.js");
        var commentDao = new CommentDao();
        var cuid = req.query.cuid;

        commentDao.queryAll(cuid, function(commentData) {
            res.render('detailsView', {
                userse: usersession,
                detailData: detailData,
                commentData: commentData
            });
        })

    });

});
//添加评论
app.post('/detailComments', urlencodedParser, function(request, response) {
    var CommentDao = require("./Dao/CommentDao.js");
    var commentDao = new CommentDao();
    var cuid = request.body.cuid;
    var comments = request.body.comment;
    commentDao.insertData(comments, cuid, function(result) {
        if (result) {
            response.json({ res: 'ok' });
            response.end();
        }
    })

});




// person开始;
//用户session
var usersession;
var allurl = 'http://localhost:8080';
var seurl;
//首页
app.get('/index', function(req, res) {
    // seurl=allurl+req.url;
    res.render('index', { userse: usersession });
});

//个人中心
// 图片连接
var listurl = 'http://localhost:8088/';
app.get('/person', function(req, res) {
    // seurl=allurl+req.url;
    // console.log(!usersession);session没有值时是undefined,!usersession就是true;所以没有session就进入了条件，有就不进去。
    if (!usersession) {
        res.render('login', { urlnow: '' });
        // console.log(111);
    } else {
        var uid = usersession.uid;
        var reserveDao = require('./dao/reservedao');
        var reservedao = new reserveDao();
        reservedao.queryhid(uid, function(reshid) {
            var hid = reshid.hid;
            if (!hid) {
                res.render('person', { userse: usersession, reserver: '' });
            } else {
                reservedao.queryroom(hid, function(result) {
                    // console.log(result);
                    var arr = [];
                    var imglist;
                    for (var i = 0; i < result.length; i++) {
                        var imglist = result[i].himg.split(' ');
                        for (var j = 0; j < imglist.length; j++) {
                            imglist[j] = listurl + imglist[j];
                        }
                        arr[i] = imglist;
                    }
                    // console.log(arr);
                    res.render('person', { userse: usersession, reserver: result, imglist: arr });
                });
            }
        });
    }
});

//个人资料
app.get('/personinfo', function(req, res) {
    if (!usersession) {
        //不用多余的赋值，就算urlnow置为空，仍然可以跳转回来。
        res.render('login', { urlnow: '' });
    } else {
        var uid = usersession.uid;
        // console.log(uid);
        var infoDao = require('./dao/personinfodao');
        var infodao = new infoDao();
        infodao.findinfo(uid, function(result) {
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    res.render('personinfo', { userse: usersession, data: result[i] });
                }
            } else {
                res.render('personinfo', { userse: usersession });
            }
        });
    }
});

//修改资料
app.post('/updateinfo', urlencodedParser, function(req, res) {
    var uid = usersession.uid;
    var username = req.body.username;
    // var pwd = req.body.passwd;
    var age = req.body.age;
    var usersex = req.body.usersex;
    var usertel = req.body.usertel;
    var email = req.body.email;
    // var md5 = crypto.createHash('md5');
    // var passwd = md5.update(pwd).digest('hex');
    // console.log(uid, username, passwd, age, usersex, usertel, email);
    var infoDao = require('./dao/personinfodao');
    var infodao = new infoDao();
    infodao.findother(uid, username, function(result) {
        if (result != 0) {
            res.json('being');
            res.end();
        } else {
            console.log('可以修改');
            var updateuserDao = require('./dao/updateuserdao');
            var updateuserdao = new updateuserDao();
            updateuserdao.updateuser(uid, username, age, usersex, usertel, email, function(result) {
                if (result == 'ok') {
                    res.json(result);
                    res.end();
                } else {
                    res.json('failed');
                    res.end();
                }
            });
        }
    });
});

//跳转发表/修改
app.get('/writearticle', function(req, res) {
    var tid = req.query.tid;
    // console.log(tid);
    if (!usersession) {
        res.render('login', { urlnow: '' });
    } else {
        if (tid) {
            var querytxtDao = require('./dao/querytxtdao');
            var querytxtdao = new querytxtDao();
            querytxtdao.querytxt(tid, function(result) {
                res.render('writearticle', { userse: usersession, mytxt: result });
            });
        } else {
            res.render('writearticle', { userse: usersession, mytxt: '' });
        }
    }
});

//发表提交
app.post('/pusharticle', urlencodedParser, function(req, res) {
    var uid = usersession.uid;
    var title = req.body.utitle;
    var author = req.body.author;
    var content = req.body.contents;
    var keywords = req.body.keywords;
    // console.log(uid, title, author, content, keywords);
    var pushartDao = require('./dao/pushartdao');
    var pushartdao = new pushartDao();
    pushartdao.insertart(uid, title, author, content, keywords, function(result) {
        if (result == 'ok') {
            res.json(result);
            res.end();
        }
    });
});

//游记修改提交
app.post('/upmyart', urlencodedParser, function(req, res) {
    var tid = req.body.htid;
    var title = req.body.utitle;
    var author = req.body.author;
    var content = req.body.contents;
    var keywords = req.body.keywords;
    // console.log(tid, title, author, content, keywords);
    var pushartDao = require('./dao/pushartdao');
    var pushartdao = new pushartDao();
    pushartdao.updateart(tid, title, author, content, keywords, function(result) {
        if (result == 'ok') {
            res.json(result);
            res.end();
        }
    });
});
//删除我的游记
app.post('/delmyart', urlencodedParser, function(req, res) {
    var tid = req.body.tid;
    var pushartDao = require('./dao/pushartdao');
    var pushartdao = new pushartDao();
    pushartdao.delart(tid, function(result) {
        res.json(result);
        res.end();
    });
});

//积分
app.get('/userpoint', function(req, res) {
    if (!usersession) {
        res.render('login', { urlnow: '' });
    } else {
        res.render('userpoint', { userse: usersession });
    }
});
//我的文章
app.get('/myarticle', function(req, res) {
    if (!usersession) {
        res.render('login', { urlnow: '' });
    } else {
        var uid = usersession.uid;
        var pushartDao = require('./dao/pushartdao');
        var pushartdao = new pushartDao();
        pushartdao.querytext(uid, function(result) {
            // console.log(result);
            res.render('myarticle', { userse: usersession, artdata: result });
        });
    }
});

//福利
app.get('/myboon', function(req, res) {
    if (!usersession) {
        res.render('login', { urlnow: '' });
    } else {
        res.render('myboon', { userse: usersession });
    }
});
//跳转登录
app.get('/login', function(req, res) {
    var urlnow = req.query.urlnow;
    if (urlnow) {
        res.render('login', { urlnow: urlnow });
    } else {
        urlnow = allurl + '/index';
        res.render('login', { urlnow: urlnow });
    }
});

//登录操作
app.post('/logins', urlencodedParser, function(req, res) {
    var username = req.body.username;
    var pwd = req.body.passwd;
    var md5 = crypto.createHash('md5');
    var passwd = md5.update(pwd).digest('hex');
    console.log(username, passwd);
    var loginDao = require('./dao/logindao');
    var logindao = new loginDao();
    logindao.queryuser(username, passwd, function(result) {
        if (result == 'none') {
            res.json(result);
            res.end();
        } else {
            for (var i = 0; i < result.length; i++) {
                req.session.user = result[i];
                usersession = req.session.user;
                //存取session
                // console.log(usersession.uid);
            }
            res.json('ok');
            res.end();
        }
    });
});

//注册
app.get('/register', function(req, res) {
    res.render('register', {});
});

//注册操作
app.post('/reguser', urlencodedParser, function(req, res) {
    var username = req.body.username;
    var pwd = req.body.passwd;
    var usertel = req.body.usertel;
    var md5 = crypto.createHash('md5');
    var passwd = md5.update(pwd).digest('hex');
    // console.log(username, passwd, usertel);
    var reguserDao = require('./dao/reguserdao');
    var reguserdao = new reguserDao();
    reguserdao.finduser(username, function(result) {
        console.log(result);
        if (result.length > 0) {
            res.json('have');
            res.end();
        } else {
            reguserdao.insertuser(username, passwd, usertel, function(result) {
                if (result == 'ok') {
                    res.json('ok');
                    res.end();
                } else {
                    res.json('failed');
                    res.end();
                }
            });
        }
    });

});

//注销
app.get('/clearuse', function(req, res) {
    usersession = '';
    res.json('ok');
    res.end();
});
//    跳转找回
app.get('/findpwd', function(req, res) {
    res.render('findpwd', {});
});

//验证身份
app.post('/setnewpwd', urlencodedParser, function(req, res) {
    var username = req.body.username;
    var usertel = req.body.usertel;
    var findpwdDao = require('./dao/findpwddao');
    var findpwddao = new findpwdDao();
    findpwddao.lostquery(username, usertel, function(result) {
        if (result.length == 0) {
            res.json('none');
            res.end();
        } else {
            res.json(result.uid);
            res.end();
        }
    });
});
//传递id
app.get('/resetpwd', function(req, res) {
    var uid = req.query.uid;
    res.render('resetpwd', { uid: uid });
});
//重设
app.post('/resetmypwd', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    var pwd = req.body.passwd;
    // console.log(uid,passwd);
    var md5 = crypto.createHash('md5');
    var passwd = md5.update(pwd).digest('hex');
    var findpwdDao = require('./dao/findpwddao');
    var findpwddao = new findpwdDao();
    findpwddao.resetpwd(passwd, uid, function(result) {
        if (result == 'ok') {
            res.json(result);
            res.end();
        } else {
            res.json('failed');
            res.end();
        }
    });
});

// 预定房间
var newhid;
app.post('/reserveroom', urlencodedParser, function(req, res) {
    if (!usersession) {
        res.json('nolog');
        res.end();
    } else {
        var roomnumber = req.body.roomnumber;
        var hid = req.body.hid;
        var uid = req.body.uid;
        // console.log(roomnumber, hid, uid);
        var reserveDao = require('./dao/reservedao');
        var reservedao = new reserveDao();
        //根据uid,查询是否预约
        reservedao.queryhid(uid, function(resu) {
            if (resu.length == 0) {
                console.log('没有用户');
            } else {
                var conhid = hid.toString();
                var oldhid = resu.hid;
                var havehid = oldhid.indexOf(conhid);
                if (havehid != -1) {
                    res.json('have');
                    res.end();
                } else {
                    newhid = resu.hid + ',' + hid;
                    if (resu.hid == '') {
                        newhid = hid;
                    }
                    // console.log(newhid);
                    reservedao.touserhid(newhid, uid, function(resh) {
                        if (resh == 'ok') {
                            reservedao.uproom(roomnumber, hid, function(resr) {
                                if (resr == 'yes') {
                                    res.json('ok');
                                    res.end();
                                } else {
                                    res.json('refail');
                                    res.end();
                                }
                            });
                        } else {
                            res.json('refail');
                            res.end();
                        }
                    });
                }
            }
        });
    }
});

var server = app.listen(8080);
