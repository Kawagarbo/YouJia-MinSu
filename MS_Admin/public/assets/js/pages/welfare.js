$(document).ready(function() {
    $('#add').click(function() {
            console.log(4)
            var types = $('#types').val(); //得到页面提交的数据
            var wtitle = $('#wtitle').val();
            var wimg = $('#wimg').val();
            var waddress = $('#waddress').val();
            var whost = $('#whost').val();
            var wreception = $('#wreception').val();
            var wdeadline = $('#wdeadline').val();
            var wdetail = $('#wdetail').val();
            var whrank = $('#whrank').val();
            $.ajax({
                url: 'http://localhost:8088/welfare', //请求地址
                type: 'POST', //数据传输类型
                dataType: "JSON",
                data: {
                    whtitle: wtitle,
                    whdet: wdetail,
                    whpic: wimg,
                    waddress: waddress,
                    wreceptiontime: wreception,
                    whostphone: whost,
                    whrank: whrank,
                    wdeadline: wdeadline,
                    wkeywords: types
                }, //传输的数据
            }).done(function(data) {
                if (data.res == "ok") {
                    alert("添加数据成功!");
                    location.reload();
                } else {
                    console.log("添加失败!")
                }
            })
        })
        //删除民宿信息
    $('.delate').click(function() {
            if (!confirm("确定要删除吗？")) {
                return; }
            var whid = $(this).attr("wid");
            $.ajax({
                url: 'http://localhost:8088/delate', //请求页面操作的地址
                type: 'POST', //数据传输类型
                dataType: "JSON",
                data: { whid: whid }, //传输的数据
            }).done(function(data) {
                if (data.res == "ok") {
                    alert("删除数据成功!")
                    location.reload();
                } else {
                    alert("删除数据失败!")
                }
            })
        })
        //查看详情
    $('.checkdetail').click(function() {
        var id = $(this).attr("wid"); //得到主键id
        console.log(id);
        window.location.href = "http://localhost:8088/welfare_detail?wid=" + id;

    })

    //修改福利民宿的信息,跳转到修改页面，修改页面展示原来的信息，修改后进行更新
    $(".change").click(function() {
            var id = $(this).attr("wid"); //得到主键id
            window.location.href = "http://localhost:8088/changeWelfare?wid=" + id;
        })
        //修改信息
    $(".subchange").click(function() {
            if (!confirm("确定要修改吗？")) {
                return; }
            var id = $(this).attr("wid");
            var whtitle = $('#whtitle').val(); //名字
            var wkeywords = $('#wkeywords').val();
            var waddress = $('#waddress').val();
            var whrank = $('#whrank').val();
            var whostphone = $('#whostphone').val();
            var wdeadline = $('#wdeadline').val();
            var wreceptiontime = $('#wreceptiontime').val();
            var whpic = $('#whpic').val();
            var whdet = $('#whdet').val();
            $.ajax({
                url: 'http://localhost:8088/changesuccess', //请求地址
                type: 'POST', //数据传输类型
                dataType: "JSON",
                data: {
                    whid: id,
                    whtitle: whtitle,
                    wkeywords: wkeywords,
                    waddress: waddress,
                    whrank: whrank,
                    whostphone: whostphone,
                    wdeadline: wdeadline,
                    wreceptiontime: wreceptiontime,
                    whpic: whpic,
                    whdet: whdet
                }, //传输的数据
            }).done(function(data) {
                if (data.res == "ok") {
                    alert("修改成功!");
                    //修改成功后重新加载页面
                    location.reload();
                } else {
                    console.log("修改失败!")
                }
            })
        })
        //    点击返回所有的民宿
    $(".backAllwelfare").click(function() {
        window.location.href = "http://localhost:8088/allwelfare";
    })
})
