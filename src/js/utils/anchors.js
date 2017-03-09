
$(document).ready(function() {
    $('.nav-anchor[href^="#"]').click(function(){
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top + (-100)}, 1000);
        return false;
    });
});