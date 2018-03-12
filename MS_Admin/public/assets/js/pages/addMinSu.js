$(document).ready(function() {
    $('#addbtn').click(function() {
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
        var $hkeywords = $('#example-keywords-input').val();
        //获取当前的时间  即为上传时间
        var nowDataTime = new Date();
        var year = nowDataTime.getFullYear();
        var month = nowDataTime.getMonth() + 1;
        var date = nowDataTime.getDate();
        var h = nowDataTime.getHours(); //获取当前小时数(0-23)
        var m = nowDataTime.getMinutes(); //获取当前分钟数(0-59)
        var s = nowDataTime.getSeconds();

        var $huptime = year + '-' + month + "-" + date + " " + h + ':' + m + ":" + s;
        var $hupdatatime = $huptime;
        if (!($htitle && $haddress && $hphone && $htype && $hservetime && $himgurl && $hdetail && $huptime && $hupdatatime)) {
            $('#errormodal').modal('show');
            return;
        } else {
            $.ajax({
                url: 'http://localhost:8088/addMinSu',
                type: 'POST',
                dateType: 'JSON',
                data: {
                    htitle: $htitle,
                    hprovince: $hprovince,
                    hcity: $hcity,
                    harea: $harea,
                    haddress: $haddress,
                    Sumaddress: $Sumaddress,
                    hphone: $hphone,
                    htype: $htype,
                    himgurl: $himgurl,
                    hservetime: $hservetime,
                    hdetail: $hdetail,
                    hkeywords: $hkeywords,
                    huptime: $huptime,
                    hupdatatime: $hupdatatime
                },
                success: function(data) {
                    if (data.res == 'ok') {
                        $('#mymodal').modal('show');
                        $('#surebtn').click(function() {
                            window.location.href = "http://localhost:8088/addMinSu"
                        })
                        $('#lookbtn').click(function() {
                            window.location.href = "http://localhost:8088/lookMinSu"
                        })
                    }
                }
            })
        }


    })
})
