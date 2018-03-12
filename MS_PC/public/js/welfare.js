$(document).ready(function() {
    $("#littlehead").hover(hideSome, showSome);
    var count = 0;
    var timer1;
    var timer2;

    function hideSome() {
        count++;
        clearInterval(timer2)
        timer1 = setInterval(function() {
            $("#div2").css("height", function(index, old) {
                return $(this).height() + count + "px";
            })
            if ($("#div2").height() > 250) {
                clearInterval(timer1);
            }
        }, 50)
    }

    function showSome() {
        count++;
        clearInterval(timer1)
        timer2 = setInterval(function() {
            $("#div2").css("height", function(indeex, old) {
                return $(this).height() - count + "px";
            })
            if ($("#div2").height() < 0) {
                clearInterval(timer2);
            }
        }, 20)
    }
    //查看福利民宿详细信息
    $(".lookdetail").click(function() {
        var wid = $(this).attr("wid");
        window.location.href = "http://localhost:8080/welfaredetail?wid=" + wid;
    })

    //    民宿详情页面，点击小图片就更改大图片的src；
    $('.littleimg').click(function() {
            var src = $(this).attr("src");
            $(".experience").attr("src", src);

        })
        //更改被被选择的图片的边框
    $('#uls').mouseover(function() {
        var bordercolor = document.getElementById("uls").getElementsByTagName("li");
        for (var i = 0; i < bordercolor.length; i++) {
            bordercolor[i].onmouseover = function() {
                this.className = this.className + " hover";
            }
            bordercolor[i].onmouseout = function() {
                var cn = this.className;
                this.className = cn.replace(" hover", "");
            }
        }
    })
    $(".welfareimg").mouseover(function() {
        this.className = this.className + " hover";
    })
    $(".welfareimg").mouseout(function() {
        var cn = this.className;
        this.className = cn.replace(" hover", "");
    })

    //福利首页实现图片懒加载
    var lazyLoad = (function() {
        var size;
        var length;
        //滚动条滚动
        var timer = null;
        var is_running = false;
        //2,获得当前窗口的高度
        var winH = $(window).height();
        $(window).on("scroll", function(event) {
            //当页面滚动，加载查询到的数据库数据
            if (is_running == false) {
                is_running = true;
                clearTimeout(timer);
                //1,获得滚动滑块的最上面的Y坐标
                var scrollTop = $(window).scrollTop();
                //3,获得节点最上面的Y坐标
                var thisnode = $(".loadmore");
                // 获得节点距离顶部的高度
                var nodetop = thisnode.offset().top;
                //得到父节点
                var parentnode = $(".parentnode");
                // 如果目标节点小于滚动条加上可视区域就加载图片
                //动态的改变数据库的查询条件,滑动滚轮的时候，查询条件一直在变化
                if (nodetop >= winH + scrollTop) {
                    is_running = false;
                } else {

                    timer = setTimeout(function() {
                        var p = 0;
                        p++;
                        p % 3;
                        size = 3;
                        length = 3;
                        for (var q = 1; q < 3; q++) {
                            size += length;
                            $.ajax({
                                url: 'http://localhost:8080/ajaxWelfareindex', //请求页面操作的地址
                                type: 'GET', //数据传输类型
                                dataType: "JSON",
                                data: { size: size * p, thislength: length * q }
                            }).done(function(data) {
                                for (var i = 0; i < data.length; i++) {
                                    var imgarr = data[1].whpic.split('' + ' ')[0]
                                    var box = "<div class=\"row \" style=\"margin:-15px -15px 5px -15px;\">" +
                                        "<div style=\"position: relative;margin-top:20px;\">" +
                                        "<div class=\"col-lg-7\" style=\"height:380px ;padding-left: 0;\" class=\"imgbox LazyLoad\" >" +
                                        "<img src=\" " + data[i].whpic.split(' ')[0] + "\" class=\"welfareimg lookdetail\" style=\"height:100%;width:100%;margin:0;padding:0;\" wid=\"" + data[i].wid + "\">" +
                                        "</div>" +
                                        "<div class=\"col-lg-5 hidden-xs hidden-sm visible-lg\" style=\"height:380px;border:1px solid #E7E7E7;background-color: white;\">" +
                                        "<div>" +
                                        "<h3>" + data[i].whtitle + "</h3>" +
                                        "</div>" +
                                        "<div class=\"form-group allli\">" +
                                        "<ul>" +
                                        "<li><b>住所类型:</b>" + data[i].wkeywords + "</li>" +
                                        "<li><b>地址:</b>" + data[i].waddress + "</li>" +
                                        "<li><b>兑换所需要的积分:</b>" + data[i].whrank + "分" + "</li>" +
                                        "<li><b>入住时期:</b>" + data[i].wdeadline + "</li>" +
                                        "</ul>" +
                                        "</div>" +
                                        "<div class=\"form-group\" style=\"position: relative;top:40px;\">" +
                                        "<div class=\"col-sm-10 col-sm-push-2\">" +
                                        "<button class=\"btn btn-lg lookdetail\" type=\"button\" wid=\"" + data[i].wid + "\" style=\"margin-right:5px;\" >查看详细信息</button>" +
                                        "<button class=\"btn btn-lg rankwelfare\" type=\"button\" whrank=\"<%=data.whrank%>\" userid=\"<%= userse.uid?userse.uid:''%>\"  username=\"<%= userse.username? userse.username:''%>\">立即兑换</button>" +
                                        "</div></div></div></div></div>"
                                    parentnode.append(box);

                                }
                                // //重新加的节点因为执行顺序问题需要重新添加事件
                                // //查看福利民宿详细信息
                                $(".lookdetail").click(function() {
                                        var wid = $(this).attr("wid");
                                        window.location.href = "http://localhost:8080/welfaredetail?wid=" + wid;
                                    })
                                    //    民宿详情页面，点击小图片就更改大图片的src；
                                $('.littleimg').click(function() {
                                        var src = $(this).attr("src");
                                        $(".experience").attr("src", src);

                                    })
                                    //更改被被选择的图片的边框
                                $('#uls').mouseover(function() {
                                    var bordercolor = document.getElementById("uls").getElementsByTagName("li");
                                    for (var i = 0; i < bordercolor.length; i++) {
                                        bordercolor[i].onmouseover = function() {
                                            this.className = this.className + " hover";
                                        }
                                        bordercolor[i].onmouseout = function() {
                                            var cn = this.className;
                                            this.className = cn.replace(" hover", "");
                                        }
                                    }
                                })
                                $(".welfareimg").mouseover(function() {
                                    this.className = this.className + " hover";
                                })
                                $(".welfareimg").mouseout(function() {
                                        var cn = this.className;
                                        this.className = cn.replace(" hover", "");
                                    })
                                    //调用积分兑换的函数
                                fn();

                            })

                        }
                        //加载完成之后移除加载节点
                        thisnode.hide();
                    }, 500)
                }

            }
        })
    })();
    //判断是不是会员；不是会员就进行登录；
    //点击申请判断会员的积分是否足够，足够弹出模态框是否兑换，兑换成功是否跳转到个人中心查看；积分不够就提示兑换失败
    function fn() {
        $(".rankwelfare").click(function() {
            //得到会员的积分
            var usersrank = $(this).attr("usersrank");
            //得到当前民宿的积分兑换
            var whrank = $(this).attr("whrank");
            //得到用户名
            var username = $(this).attr("username");
            //得到用户的id
            var userid = $(this).attr("userid")
                //得到文章的id
            var wid = $(this).attr("wid");
            //判断是不是会员，如果是。。。。。
            if (username) {
                //如果积分足够即可兑换
                if (usersrank > whrank) {
                    $(".modal-title").html("温馨提示");
                    $(".first").html("您确定兑换此住宿吗？你当前有" + usersrank + "积分")
                    $('#myModal').modal('show');
                    //如果点击确定，弹出成功的模态框
                    $(".sure").click(function() {
                        //得到兑换后的积分还要加上20
                        var successrank = usersrank - whrank + 20;
                        console.log(successrank);
                        //将积分更改后的数据更新到数据库，传输到个人中心里面去，
                        $.ajax({
                            url: 'http://localhost:8080/rank', //请求页面操作的地址
                            dataType: "JSON",
                            type: 'POST', //数据传输类型
                            data: { successrank: successrank, wid: wid, userid: userid }
                        }).done(function(data) {
                            if (data.res == 'ok') {
                                $(".nextmodal-title").html("温馨提示");
                                $(".next").html("兑换成功！去个人中心可以看到啦！");
                                $('#YouModal').modal('show');
                            }
                        })
                    });
                } else if (usersrank < whrank) {
                    $(".modal-title").html("温馨提示");
                    $(".first").html("您的积分还不够兑换此住宿哦！请多多评论发表文章获得积分吧！")
                    $(".no").hide();
                    $('#myModal').modal('show');
                }
                //  如果未登录
            } else {
                $(".modal-title").html("温馨提示");
                $(".first").html("可爱的您还未登录，请先登录！")
                $(".no").hide();
                $('#myModal').modal('show');
            }

        });
    }
    fn();
});
