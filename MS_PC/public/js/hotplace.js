$(document).ready(function($) {
    var allurl = 'http://localhost:8080/';
    $('.hot-destination').on('click', '.hot-destination-item', function() {
        var place = $(this).attr('data-text');
        window.location.href = 'http://localhost:8080/hotplace?place=' + place + '&&$page=1';
    })
    $('.itembox').click(function() {
        var hid = $(this).attr('data-hid');
        console.log(hid);
        window.location.href = 'http://localhost:8080/hotplaceMSdetails?hid=' + hid;
    });
    //    预定
    $('.btn-reserve').click(function() {
        var roomnumber = $(this).val();
        var hid = $('.ithid').val();
        if (roomnumber < 1) {
            $('#reserve-mdl').modal('show');
            $('.mdl-text').text('很抱歉，房间已被订满。');
        } else {
            $('#reserve-mdl').modal('show');
            $('.mdl-text').text('预定之后工作人员在1小时内联系您具体事宜，请耐心等待！');
            $('.btn-sure').click(function() {
                var uid = $(this).val();
                roomnumber = roomnumber - 1;
                $.ajax({
                    url: allurl + 'reserveroom',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        uid: uid,
                        roomnumber: roomnumber,
                        hid: hid
                    }
                }).done(function(data) {
                    if (data == 'nolog') {
                        var urlto = confirm('您还没有登录');
                        var urlnow = window.location.href;
                        if (urlto == true) {
                            window.location.href = allurl + 'login?urlnow=' + urlnow;
                        }
                    } else if (data == 'ok') {
                        var tope = confirm('预定成功,合理原理需要取消请在1小时内联系工作人员！');
                        if (tope == true) {
                            window.location.href = allurl + 'person';
                        }
                    } else if (data == 'refail') {
                        alert('预定失败');
                    } else if (data == 'have') {
                        alert('您已经预定过了，请勿重复预定，以免产生不必要的费用');
                    }
                });
            });
        }
    });
});
