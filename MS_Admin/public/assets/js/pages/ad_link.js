/**
 * Created by dongyang on 2018.01.18.
 */
var allurl = 'http://localhost:8088/';
$(document).ready(function() {
    //删除session
    $('#ad_link').click(function() {
        var asrc = $('#ad_link').attr('href');
        console.log(asrc);
        if (asrc == '#') {
            $.ajax({
                url: allurl + 'clearse',
                type: 'GET',
                dataType: 'JSON',
            }).done(function(data) {
                if (data.res == 'ok') {
                    window.location.href = allurl + 'index';
                }
            });
        }
    });
    //删除用户
    $('.btn-det').click(function() {
        var uid = $(this).val();
        var decide = confirm('请仔细考虑，确定删除用户？');
        if (decide == true) {
            $.ajax({
                url: allurl + 'deluser',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    uid: uid
                }
            }).done(function(data) {
                if (data == 'ok') {
                    window.location.href = allurl + 'ad_userinfo';
                } else {
                    alert('删除失败');
                }
            });
        } else {
            console.log('取消操作');
        }
    });
    //跳转修改
    $('.btn-up').click(function() {
        var uid = $(this).val();
        console.log(uid);
        var decide = confirm('慎重考虑，请不要随意修改用户信息！');
        if (decide == true) {
            window.location.href = allurl + 'ad_upuserinfo?uid=' + uid;
        }
    });

    //修改用户信息
    $('.btn-upsure').click(function() {
        // var uid=$('#material-color-success').val();
        // var username=$('#material-color-success').val();
        // var userage=$('#material-color-info').val();
        // var usersex=$('#material-select').val();
        // var usertel=$('#material-color-warning').val();
        // var useremail=$('#material-color-danger').val();
        // var userrank=$('#material-color-primary').val();
        // username:username,
        //     userage:userage,
        //     usersex:usersex,
        //     usertel:usertel,
        //     useremail:useremail,
        //     userrank:userrank
        var userinfo = $('#upinfo').serialize();
        var decide = confirm('真的要修改吗？');
        if (decide == true) {
            $.ajax({
                url: allurl + 'upuserinfo',
                type: 'POST',
                dataType: 'JSON',
                data: userinfo
            }).done(function(data) {
                if (data == 'ok') {
                    window.location.href = allurl + 'ad_userinfo';
                } else {
                    alert('删除失败');
                }
            });
        } else {
            console.log('取消操作');
        }
    });
    //  选中用户数据的id的数组作为全局变量
    var arranyone = [];
    //全选
    $('#bo1').click(function() {
        $(this).attr('checked', true);
        $('#bo2').removeAttr('checked');
        $('.checkit').attr('checked', true);
        $('.checkit').prop('checked', true);
        var dellist = $('.checkit').valueOf();
        // console.log(dellist);
        //   console.log(arranyone);
        if (arranyone.length == 0) {
            for (var i = 0; i < dellist.length; i++) {
                var delid = dellist[i].value;
                arranyone.push(delid);
                // console.log(arranyone);
            }
        } else {
            for (var i = 0; i < dellist.length; i++) {
                var delid = dellist[i].value;
                var res = $.inArray(delid, arranyone);
                if (res == -1) {
                    arranyone.push(delid);
                }
            }
        }
        // console.log(arranyone);
    });
    //不选
    $('#bo2').click(function() {
        $(this).attr('checked', true);
        $('#bo1').removeAttr('checked');
        $('.checkit').removeAttr('checked');
        var dellist = $('.checkit').valueOf();
        if (arranyone.length > 0) {
            arranyone = [];
        }
        // console.log(arranyone);
    });
    //点击选中，再次点击取消选中。
    $('.checkit').click(function() {
        if ($(this).prop('checked') == false) {
            $(this).removeAttr('checked');
            arranyone.shift($(this).val());
        } else {
            $(this).attr('checked', true);
            arranyone.push($(this).val());
        }
        // console.log(arranyone);
    });

    //提交批量删除
    $('.btn-list').click(function() {
        // console.log(arranyone);
        if (arranyone.length > 0) {
            var dellist = arranyone.join(',');
            console.log(dellist);
            if (confirm('警告，确定批量删除用户？')) {
                $.ajax({
                    url: allurl + 'dellist',
                    type: 'POST',
                    dataType: 'JSON',
                    data: { dellist: dellist },
                    traditional:  true
                }).done(function(data) {
                    if (data == 'ok') {
                        window.location.href = allurl + 'ad_userinfo';
                    } else {
                        alert('批量删除失败');
                    }
                });
            }
        } else {
            alert('没有需要删除的项！');
        }
    });
//    跳转用户预约详情
    $('.btn-tocan').click(function () {
        var uid=$(this).val();
        window.location.href=allurl+'ad_tocancel?uid='+uid;
    });
//    取消预约
    $('.btn-cancelit').click(function () {
        var nowurl=window.location.href;
        // console.log(nowurl);
        var hid=$(this).val();
        var uid=$('#myuid').val();
        console.log(hid,uid);
        if (confirm('注意，确定取消预约？')) {
            $.ajax({
                url: allurl + 'cancelhome',
                type: 'POST',
                dataType: 'JSON',
                data: { hid: hid, uid:uid }
            }).done(function(data) {
               if(data=='ok'){
                   window.location.href=nowurl;
               }else{
                   alert('取消失败');
               }
            });
          } else {
           console.log('取消了操作');
          }
    });
});
