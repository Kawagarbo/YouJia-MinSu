$(document).ready(function() {
    $('.delete-btn').click(function() {
        $('#delArticle').modal('show');
        var $tid = $(this).context.attributes.tid.value;
        console.log($tid);
        $('#confirmDel').click(function() {

            $.ajax({
                url: 'http://localhost:8088/deleteArticle?tid=' + $tid, //请求地址
                type: 'GET', //数据传输类型
                dataType: "JSON",
                data: {}, //传输的数据
            }).done(function(data) {
                if (data.res == "ok") {
                    alert("删除数据成功")
                    location.reload();
                } else {
                    console.log("删除失败")
                }
            })
        })
    })
})
