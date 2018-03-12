$(document).ready(function() {
    $('.delbtn').click(function() {
        var hid = $(this).attr('data-id');
        $('#confirmmodal').modal('show');
        $('#confirmbtn').click(function() {
            $.ajax({
                url: 'http://localhost:8088/delMinSu',
                type: 'POST',
                dateType: 'JSON',
                data: { hid: hid },
                success: function(data) {
                    console.log(data.res);
                    if (data.res == 'ok') {
                        $('#succmodal').modal('show');
                        window.location.href = "http://localhost:8088/lookMinSu"
                    } else {
                        $('#failmodal').modal('show');
                        window.location.href = "http://localhost:8088/lookMinSu"
                    }
                }
            })
        })

    })
})
