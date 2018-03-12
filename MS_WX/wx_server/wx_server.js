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

//首页
app.post('/index', urlencodedParser, function(req, res) {
    var id = req.body.hpid;
    var indexDao = require('./Dao/indexDao');
    var indexdao = new indexDao();
    indexdao.getHpInfo(id, function(result) {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                var Imgurl = "http://localhost:8080/" + result[i].img;
                result[i].img = Imgurl;
            }
            res.json(result);
            res.end();

        } else {
            console.log('查询失败');
        }
    });
});
//首页热门目的地
app.post('/hotplace', urlencodedParser, function(req, res) {
    var hcity = req.body.city;
    var hotplaceDao = require('./Dao/hotplaceDao');
    var hotplacedao = new hotplaceDao();
    hotplacedao.getHomeInfo(hcity, function(result) {
        //console.log(result);
        if (result) {
            var homeImg = [];
            for (var i = 0; i < result.length; i++) {
                var himgArr = result[i].himg.split(' ');
                homeImg[i] = himgArr;
                // console.log(homeImg[i]);
                for (var j = 0; j < homeImg[i].length; j++) {
                    var Imgurl = "http://localhost:8080/" + homeImg[i][j];
                    homeImg[i][j] = Imgurl;
                }
                result[i].himg = homeImg[i];
            }
            res.json(result);
            res.end();

        } else {
            console.log('查询失败');
        }
    });
});

//热门目的地界面
app.post('/hpmsdetail', urlencodedParser, function(req, res) {
    var hid = req.body.hid;
    var hpmsdetailDao = require('./Dao/hpmsdetailDao');
    var hpmsdetaildao = new hpmsdetailDao();
    hpmsdetaildao.getOneInfo(hid, function(result) {
        if (result) {
            var homeImg = result[0].himg.split(' ');
            for (var i = 0; i < homeImg.length; i++) {
                homeImg[i] = "http://localhost:8080/" + homeImg[i];
                result[0].himg = homeImg;
            }
            res.json(result);
            res.end();

        } else {
            console.log('查询失败');
        }
    });
});

//首页文章展示
app.post('/stroyIndex', urlencodedParser, function(req, res) {
    var stroyIndexDao = require('./Dao/stroyIndexDao');
    var stroyindexdao = new stroyIndexDao();
    stroyindexdao.getStoryInfo(function(result) {
        if (result) {

            var articleImg = [];
            for (var i = 0; i < result.length; i++) {
                var aimgArr = result[i].apic.split("&&");
                articleImg[i] = aimgArr;
                for (var j = 0; j < articleImg[i].length; j++) {
                    var Imgurl = "http://localhost:8080/" + articleImg[i][j];
                    articleImg[i][j] = Imgurl;
                }
                result[i].apic = articleImg[i];
            }
            res.json(result);
            res.end();

        } else {
            console.log('查询失败');
        }
    });
});

//首页福利民宿展示
app.post('/welfareIndex', urlencodedParser, function(req, res) {
    var welfareIndexDao = require('./Dao/welfareIndexDao');
    var welfareindexdao = new welfareIndexDao();
    welfareindexdao.getWelfareInfo(function(result) {
        if (result) {
            var welfareImg = [];
            for (var i = 0; i < result.length; i++) {
                var wimgArr = result[i].whpic.split(" ");
                welfareImg[i] = wimgArr;
                for (var j = 0; j < welfareImg[i].length; j++) {
                    var Imgurl = "http://localhost:8080/" + welfareImg[i][j];
                    welfareImg[i][j] = Imgurl;
                }
                result[i].whpic = welfareImg[i];
            }
            res.json(result);
            res.end();

        } else {
            console.log('查询失败');
        }
    });
});

//个人中心模块
// session设置
app.use(session({
    secret: '123',
    name: 'express-pro', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 1000 * 5 }, //24h  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
app.post('/wxuser', urlencodedParser, function(req, res) {
    var username = req.body.username;
    var userimg = req.body.userimg;
    // 加密密码时使用。
    // var md5=crypto.createHash('md5');
    // var passwd=md5.update(pwd).digest('hex');
    console.log(username, userimg);
    var userDao = require('./dao/userdao');
    var userdao = new userDao();
    userdao.queryuser(username, function(result) {
        if (result == 0) {
            userdao.insertuser(username, userimg, function(insertdata) {
                res.json(insertdata);
                res.end();
            });
        } else {
            res.json(result);
            res.end();
        }
    });
});
app.post('/updateinfo', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    var userage = req.body.userage;
    var usersex = req.body.usersex;
    var usertel = req.body.usertel;
    var useremail = req.body.useremail;
    console.log(uid, userage, usersex, usertel, useremail);
    var userDao = require('./dao/userdao');
    var userdao = new userDao();
    userdao.updateuserinfo(uid, userage, usersex, usertel, useremail, function(result) {
        res.json(result);
        res.end();
    });
});
app.post('/queryinfo', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    var userDao = require('./dao/userdao');
    var userdao = new userDao();
    userdao.queryrank(uid, function(result) {
        if (result == 0) {
            console.log('没有数据');
        } else {
            res.json(result);
            res.end();
        }
    });
});
app.post('/writeart', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    var title = req.body.title;
    var author = req.body.author;
    var content = req.body.content;
    var keyword = req.body.keyword;
    console.log(uid, title, author, content, keyword);
    var writeartDao = require('./dao/writeartdao');
    var writeartdao = new writeartDao();
    writeartdao.insertart(uid, title, author, content, keyword, function(result) {
        if (result == 'ok') {
            res.json(result);
            res.end();
        } else {
            console.log('写入失败');
        }
    });
});
app.post('/queryart', urlencodedParser, function(req, res) {
    var uid = req.body.uid;
    console.log(uid);
    var writeartDao = require('./dao/writeartdao');
    var writeartdao = new writeartDao();
    writeartdao.querytext(uid, function(result) {
        if (result.length > 0) {
            console.log(result);
            res.json(result);
            res.end();
        } else {
            res.json(0);
            res.end();
        }

    });
});

// 查看福利民宿
app.post('/welfaredata', urlencodedParser, function(req, res) {
    var checkWelfareDao = require('./Dao/checkWelfareDao');
    var checkWelfaredao = new checkWelfareDao();

    checkWelfaredao.verification(function(result) {
        // 获得图片数组进行分割
        // console.log(result[0].whpic.split(" ")[0]);
        if (result) {
            var imgurl = [];
            for (var i = 0; i < result.length; i++) {
                // 给图片的地址加上访问路径重新赋值
                imgurl[i] = result[i].whpic.split(" ");
                for (var j = 0; j < imgurl[i].length; j++) {
                    imgurl[i][j] = "http://localhost:8080/" + imgurl[i][j];
                }
                result[i].whpic = imgurl[i]
            }
            // 将请求回来的数据转为json格式
            res.json(result);
            res.end();
        } else {
            console.log(hhh)
        }
    })
})
app.post("/welfaredetail", urlencodedParser, function(req, res) {
    {
        var id = req.body.id;
        console.log(id);
        var checkoneWelfareDao = require('./Dao/checkoneWelfareDao');
        var checkoneWelfaredao = new checkoneWelfareDao();
        checkoneWelfaredao.verification(id, function(result) {
            // 获得图片数组进行分割
            // console.log(result[0].whpic.split(" "));
            if (result) {
                var imgurl = [];
                // 给图片的地址加上访问路径重新赋值
                imgurl = result[0].whpic.split(" ");
                for (var j = 0; j < imgurl.length; j++) {
                    imgurl[j] = "http://localhost:8080/" + imgurl[j];
                }
                result[0].whpic = imgurl;
                // 将请求回来的数据转为json格式
                res.json(result);
                res.end();
            } else {
                console.log(hhh)
            }
        })

    }
})

//关键字查询文章分类
app.get('/articlelist', function(req, res) {
    var keywords = req.query.keywords;

    var SelectArticleDao = require('./Dao/SelectArticleDao');
    var selectArticleDao = new SelectArticleDao();
    selectArticleDao.queryAll(keywords, function(data) {
        res.write(JSON.stringify(data));
        res.end();
    })
});
//详情查询一条文章
app.get('/detailView', function(req, res) {
    var tid = req.query.tid;

    var SelectArticleDao = require('./Dao/SelectArticleDao');
    var selectArticleDao = new SelectArticleDao();
    selectArticleDao.queryOne(tid, function(data) {
        var CommentDao = require("./Dao/CommentDao.js");
        var commentDao = new CommentDao();
        var cuid = req.query.cuid;
        console.log(cuid);
        commentDao.queryComment(cuid, function(commentData) {
            var datas = {
                data: data,
                commentData: commentData
            }
            res.write(JSON.stringify(datas));
            res.end();
        })
    })
});
//传值插入评论信息
app.get('/commentList', function(req, res) {
    var cuid = req.query.cuid;
    var comment = req.query.comment;
    var CommentDao = require('./Dao/CommentDao');
    var commentDao = new CommentDao();
    commentDao.insertOne(cuid, comment, function(data) {
        if (data) {
            res.json({ result: 'ok' });
            res.end();
        }
    })
});
var server = app.listen(8080);
