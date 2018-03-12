/**
 * Created by dongyang on 2018.01.23.
 */
$(document).ready(function () {
    var allurl='http://localhost:8080/';
   // 点击跳转登录
   $('#userlogin').click(function () {
       if($(this).text()=='登录'){
           var urlnow=window.location.href;
           window.location.href=allurl+'login?urlnow='+urlnow;
       }
   });
   //点击注册/注销
   $('#reordel').click(function () {
      if($(this).text()=='注销'){
          var urlnow=window.location.href;
          window.location.href=allurl+'login?urlnow='+urlnow;
          $.ajax({
              url: allurl+'clearuse',
              type: 'GET',
              dataType: 'JSON',
          }).done(function(data) {
              if (data == 'ok') {
                  window.location.href = urlnow;
              }
          });
      }
   });
   //登录
   $('#btn-login').click(function () {
       var username=$("#name").val();
       var passwd=$('#pwd').val();
       var urlnow=$('#urlnow1').val();
       if(!username){
           $("#name").focus();
           $("#name").attr('placeholder','帐户不能为空');
       }else if(!passwd){
           $("#pwd").focus();
           $("#pwd").attr('placeholder','密码不能为空');
       }else{
           $.ajax({
               url: allurl+'logins',
               type: 'POST',
               dataType: 'JSON',
               data:{
                   username:username,
                   passwd:passwd,
               }
           }).done(function(data) {
               if (data == 'none') {
                  alert('该用户不存在，请仔细核对您的帐号和密码');
               }else{
                       window.location.href = urlnow;
               }
           });
       }
   });
//   点击网页头部跳转注册
    $('#reordel').click(function () {
        window.location.href=allurl+'register';
    });
//    登录界面跳注册
    $('#btn-toreg').click(function () {
        window.location.href=allurl+'register';
    });
//    注册界面跳登录
    $('#btn-tologin').click(function () {
        window.location.href=allurl+'login';
    });
//    实现注册
    $('#btn-reg').click(function () {
        var regname=$('#regname').val();
        var regpwd=$('#regpwd').val();
        var regpwd1=$('#regpwd1').val();
        var regtel=$('#regtel').val();
        //11位手机号正则;
        var testel = /^1\d{10}$/;
        if(!regname){
            $('#regname').attr('placeholder','用户名不能为空!');
            $('#regname').focus();
            return;
        }else if(!regpwd){
            $('#regpwd').attr('placeholder','密码不能为空!');
            $('#regpwd').focus();
            return;
        }else if(regpwd!=regpwd1){
            alert('两次输入的密码不一致，请重新输入!');
            $('#regpwd1').focus();
            return;
        }else if(!regtel){
            $('#regtel').attr('placeholder','电话号码不能为空！');
            $('#regtel').focus();
            return;
        }else if(!testel.test(regtel)){
            alert('请输入11位手机号码');
            $('#regtel').focus();
            return;
        }else{
            $.ajax({
                url: allurl+'reguser',
                type: 'POST',
                dataType: 'JSON',
                data:{
                    username:regname,
                    passwd:regpwd,
                    usertel:regtel
                }
            }).done(function(data) {
                if(data=='have'){
                    alert('用户名存在，请重新输入。');
                    return;
                }else if(data=='ok'){
                   alert('注册成功，请使用账户和密码进行登录。');
                   window.location.href=allurl+'login';
               }else{
                   alert('注册失败，请重新注册。');
               }
            });
        }
    });
//找回密码
    $('#btn-findpwd').click(function () {
        var username=$('#name').val();
        var usertel=$('#tel').val();
        $.ajax({
            url:allurl+'setnewpwd',
            type:'POST',
            dataType:'JSON',
            data:{
                username:username,
                usertel:usertel
            }
        }).done(function (data) {
            if(data=='none'){
                alert('请仔细核对您的用户名和手机号是否填写正确！');
                return;
            }else{
                window.location.href=allurl+'resetpwd?uid='+data;
            }
        });
    });
//    重置密码
    $('#btn-resetpwd').click(function () {
        var uid=$('#thisid').val();
        var pwd=$('#pwd').val();
        $.ajax({
            url:allurl+'resetmypwd',
            type:'POST',
            dataType:'JSON',
            data:{
                passwd:pwd,
                uid:uid
            }
        }).done(function (data) {
           if(data=='ok'){
               alert('密码重置成功，请使用新密码进行登录！');
               window.location.href=allurl+'login';
           }else{
               alert('重置失败');
           }
        });
    })
});