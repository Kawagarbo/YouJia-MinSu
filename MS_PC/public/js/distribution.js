$(document).ready(function () {
    $('#hpbtn').click(function () {
        var city=$('#city').val();
        if(!city){
            confirm('请选择您的目的地');
            return;
        }
        window.location.href='http://localhost:8080/distribution?city='+city;
    })
})
