$(document).ready(function() {
    $('#updatabtn').click(function() {
        var $hid = $('#data-hid').val();
        var $htitle = $('#example-title-input').val();
        var $hprovince = $('#provinceName').val();
        var $hcity = $('#cityName').val();
        var $harea = $('#areaName').val();
        var $haddress = $('#example-address-detail-input').val();
        var $Sumaddress = $hprovince + $hcity + $harea + $haddress;
        var $hphone = $('#example-phone-input').val();
        var $htype = $('#example-type-select').val();
        var $hservetime = $('#example-servertime').val();
        var $himgurl = $('#note-image-url').val();
        var $hdetail = $('#example-textarea-input').val();

        //获取当前的时间  即为当前修改时间时间
        var nowDataTime = new Date();
        var year = nowDataTime.getFullYear();
        var month = nowDataTime.getMonth() + 1;
        var date = nowDataTime.getDate();
        var h = nowDataTime.getHours(); //获取当前小时数(0-23)
        var m = nowDataTime.getMinutes(); //获取当前分钟数(0-59)
        var s = nowDataTime.getSeconds();

        var $hupdatatime = year + '-' + month + "-" + date + " " + h + ':' + m + ":" + s;
        if (!($htitle && $haddress && $hphone && $htype && $hservetime && $himgurl && $hdetail && $hupdatatime)) {
            $('#errormodal').modal('show');
            return;
        } else {
            $.ajax({
                url: 'http://localhost:8088/updataMinSu',
                type: 'POST',
                dateType: 'JSON',
                data: {
                    hid: $hid,
                    htitle: $htitle,
                    hprovince: $hprovince,
                    haddress: $haddress,
                    hcity: $hcity,
                    harea: $harea,
                    Sumaddress: $Sumaddress,
                    hphone: $hphone,
                    htype: $htype,
                    hservetime: $hservetime,
                    himgurl: $himgurl,
                    hdetail: $hdetail,
                    hupdatatime: $hupdatatime
                },
                success: function(data) {
                    console.log(data.res);
                    if (data.res == 'ok') {
                        $('#mymodal').modal('show');
                        $('#lookbtn').click(function() {
                            window.location.href = "http://localhost:8088/lookMinSu"
                        })
                    }
                }
            })
        }
    })
})
