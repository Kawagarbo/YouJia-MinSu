/**
 * Created by dongyang on 2018.01.17.
 */
$(document).ready(function() {
    $('#login_ad').click(function() {
        var adname = $('#adname').val();
        var adpwd = $('#pwd').val();
        if (!adname) {
            $('#adname').focus();
            $('#adname').attr('placeholder', '帐户不能为空');
        } else if (!adpwd) {
            $('#pwd').focus();
            $('#pwd').attr('placeholder', '密码不能为空');
        } else {
            $.ajax({
                url: 'http://localhost:8088/logins',
                type: 'POST',
                dataType: 'JSON',
                data: { username: adname, passwd: adpwd }
            }).done(function(data) {
                console.log(data);
                if (data.res == 'ok') {
                    window.location.href = 'http://localhost:8088/index';
                } else if (data.res == 'failed') {
                    alert('登录失败,请核对你是否具有管理员身份');
                }
            });
        }
    });
});
