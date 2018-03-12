/**
 * Created by dongyang on 2018.01.22.
 */
var perurl='http://localhost:8080/';
$(document).ready(function () {
    //修改资料
    $('#btn-upuser').click(function () {
        var infolist=$('#infolist').serialize();
        var upit=confirm('确定修改个人资料？');
        if(upit==true){
            $.ajax({
                url: perurl+'updateinfo',
                type: 'POST',
                dataType: 'JSON',
                data:infolist
            }).done(function(data) {
                if (data == 'ok') {
                    alert('修改成功');
                    window.location.href = perurl+'person';
                }else if(data=='being'){
                    alert('昵称已存在');
                }else {
                    alert('修改失败');
                }
            });
        }else {
            console.log('取消修改');
        }
    });
//   跳转写文章
    $('.btn-write').click(function () {
        window.location.href=perurl+'writearticle';
    });
//    发表文章
    $('#publication').click(function () {
       console.log( $(this).text());
       var title=$('#title').val();
       var content=$('#content').val()
        if($(this).text()=='现在发表'){
            if(!title){
                $('#title').focus();
                $('#title').attr('placeholder','标题不能为空');
                return;
            }else if(!content){
                $('#content').focus();
                $('#content').attr('placeholder','内容不能为空');
                return;
            }
            var artlist=$('#artlist').serialize();
            var pushart=confirm('校对完毕，确认发布？');
            if(pushart==true){
                $.ajax({
                    url: perurl+'pusharticle',
                    type: 'POST',
                    dataType: 'JSON',
                    data:artlist
                }).done(function(data) {
                    if (data == 'ok') {
                        window.location.href = perurl+'myarticle';
                    }
                });
            }else {
                console.log('取消发布');
            }
        }else{
            var uplist=$('#artlist').serialize();
            var upart=confirm('修改完毕，确认改动？');
            if(upart==true){
                $.ajax({
                    url: perurl+'upmyart',
                    type: 'POST',
                    dataType: 'JSON',
                    data:uplist
                }).done(function(data) {
                    if (data == 'ok') {
                        window.location.href = perurl+'myarticle';
                    }else{
                        alert('修改失败');
                    }
                });
            }else {
                console.log('取消修改');
            }
        }
    });
//    修改文章
    $('.uptext').click(function () {
        var tid=$(this).val();
        var upmytext=confirm('确认修改？');
        if(upmytext==true){
            window.location.href=perurl+'writearticle?tid='+tid;
        }
    });
//删除文章
    $('.deltext').click(function () {
        var tid=$(this).val();
        var delmyart=confirm('确认删除？');
        if(delmyart==true){
            $.ajax({
                url: perurl+'delmyart',
                type: 'POST',
                dataType: 'JSON',
                data:{tid:tid}
            }).done(function(data) {
                if (data == 'ok') {
                    window.location.href = perurl+'myarticle';
                }else{
                    alert('删除失败');
                }
            });
        }
    });
//    查看详情传值
    $('.details').click(function () {
        var tid=$(this).val();
        var cuid=$(this).attr('cuid');
        window.location.href='http://localhost:8080/detailsView?tid='+tid+'&&'+'cuid='+cuid;
    });
});