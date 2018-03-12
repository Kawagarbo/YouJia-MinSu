function changeView(li) {
        console.log(li);
        var keywords=li.getAttribute("data-keys");
        console.log(keywords);
            $.ajax({
                url: 'http://localhost:8080/forumItem?keywords='+keywords,//请求地址
                type: 'GET',//数据传输类型
                dataType: "JSON",
                data: {},//传输的数据
            }).done(function(data){
                $('.box').html('');
                for(var i=0;i<data.length;i++) {
                    console.log(data[i]);
                    var box = $('.box');
                    var pic = data[i].apic.split('&&');
                    var akeys = data[i].akeywords.split('&&');
                    console.log(akeys);
                    var tipe = "<div class=\"col-sm-3 col-md-4\">" +
                        "<div class=\"imgs\" style=\"position: relative;\">" +
                        "<img src=\" "+ pic[0] + "\" class=\"imgopacity pre\"><p class=\"kw btn btn-success\">" + akeys + "</p>" +"</div>"+
                        "<div class=\"caption\">" +
                        "<h5>" + data[i].title + "</h5>" +
                        "<p><a href=\"detailsView?tid="+data[i].tid+"&&cuid="+data[i].cuid+"\" class=\"btn btn-primary details-btn\" role=\"button\">查看详情</a></p>" +
                        "</div></div>";
                    box.append(tipe);

                }
                $('.imgs img').bind({
                    'mouseenter': function () {
                        $(this).removeClass("imgopacity");
                        console.log(22);
                    },
                    'mouseleave': function () {
                        $(this).addClass("imgopacity");
                    }
                })
            });

    }

