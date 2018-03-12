$(document).ready(function () {
    $('#send').click(function (){
        var $comment=$('#com').val();
        var $cuid=$('#cuid').val();
        if($comment){
            $.ajax({
                url: 'http://localhost:8080/detailComments',//请求地址
                type: 'POST',//数据传输类型
                dataType: "JSON",
                data: {comment:$comment,cuid:$cuid}//传输的数据
            }).done(function(data){
                if(data.res=='ok'){
                    $('.modal').modal('show');
                    $('#comfirm').click(function () {
                        location.reload();
                    })

                }
            })
        }else{
            alert('您还没有评论哦');
        }

    })


})
