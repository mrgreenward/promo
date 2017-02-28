$(document).ready(function() {
    (function () {
        var menuButton = $('.menu-button-js'),
            list = $('.nav');
        menuButton.on('click', function (e) {
            e.preventDefault();
            menuButton.toggleClass('is-active');
            list.toggleClass('nav-js')
        });
    })();
})