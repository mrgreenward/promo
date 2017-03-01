$(document).ready(function () {
    (function ($) {
        $.fn.DropDown = function () {
        var list =  ('.dropdown-list'),
            title = ('.dropdown-menu__link'),
            item = ('.dropdown-list__label'),
            val= ('.dropdown-list__radio');

            this.on('click', function (e) {
                e.preventDefault();
                var root = $(this).parents('.dropdown-menu');

                $('.arrow-down', root).toggleClass('arrow-up');
                $(list, root).slideToggle('fast');

            });

            $(item).on('click', function () {
                $(val).not($(val,this)).prop('checked', false);
                $.cookie('city', $('.dropdown-list__radio:checked').val());

                var root = $(this).parents('.dropdown-menu');
                var labelText = $('.dropdown-list__radio:checked').parent('label').text();

                $('.arrow-down', root).removeClass('arrow-up');
                $(list, root).slideUp('fast')
                $(title).text(labelText);
            })
        }
        return this
    })($);// выпадающее меню городов

    (function () {

        function setData(address,number,mail){
            $('.city-adress').text(address);
            $('.city-number').text(number);
            $('.city-mail').text(mail);
        }

        function getAddress() {

            switch($('.dropdown-list__radio:checked', '.dropdown-menu').val()){
                case 'piter':
                    return  setData('проспект Владимирский,82','8(927)-982-872','piter@mail.ru')
                case 'chelny':
                    return  setData('Проспект Набережночелнинский, строение1,2 офис','8(231)-12-872','chelny@mail.ru');
                case 'kazan':
                    return  setData('Фрунзе, строение2,2 офис','8(443)-12-872','kazan@mail.ru');

                case 'krasnodar':
                    return  setData('Мира, строение2,2 офис','8(213)-12-872','krasnodar@mail.ru');
                case 'sevastopol':
                    return  setData('Пушкина, строение2,2 офис','8(213)-12-872','seva@mail.ru');
                default:
                    return  setData('Каширское шоссе','8(22213)-12-872','asdsad@mail.ru');
            }
        }
        $(window).on('load',function () {
            getAddress()
        })
            $('.dropdown-list__radio').on('change', function () {
                getAddress()
            })

    })(); //вывести адреса и данные в футер контактов
    (function () {

    })()
})
