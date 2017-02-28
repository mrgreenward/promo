$(document).ready(function () {
    (function () {

        $('.dropdown-menu__link').on('click', function (e) {
            e.preventDefault();
           /* var cityVal = $('.dropdown-list__radio:checked').val(),
                currenCity = $('.nav__link--title').text(),
                currentLabel = $('.dropdown-list__label');
            ValueLabel = $('.dropdown-list__radio:checked').parents('label').text();*/
            var root = $(this).parent();
            $('.arrow-down', root).toggleClass('arrow-up');
            $('.dropdown-list', root).slideToggle('fast');

        })
    })();
})