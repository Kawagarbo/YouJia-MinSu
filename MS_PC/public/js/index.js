$(document).ready(function($) {
    $('.carousel').carousel({
        interval: 2000
    });
    $('.story-item').click(function () {
        var tid=$(this).attr('data-tid');
        var cuid=$(this).attr('data-cuid');
        window.location.href='http://localhost:8080/detailsView?tid='+tid+'&&'+'cuid='+cuid;
    });

});
