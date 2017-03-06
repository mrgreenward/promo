$(document).ready(function () {
    (function ($) {

        $.fn.DropDown = function () {
        var list =  ('.dropdown-list'),
            city= ('.dropdown-list__radio');

            this.on('click', function (e) {
                e.preventDefault();
                var root = $(this).parents('.dropdown-menu');
                $('.arrow-down', root).toggleClass('arrow-up');
                $(list, root).slideToggle('fast');
            });

            $('.dropdown-list__label', '.dropdown-menu--city').on('click', function () {

                var root = $(this).parents('.dropdown-menu'),
                currentText = $('.dropdown-list__radio:checked', this).parent('label').text();// set title of this value

                localStorage.setItem('city', $(city,this).val());
                localStorage.setItem('cityChecked', currentText);

                $('.arrow-down', root).removeClass('arrow-up');
                $(list, root).slideUp('fast');
                $('.dropdown-menu__link').text(currentText);

                $(city).not($(city,this)).prop('checked', false);
            })
        }
        return this
    })($);// выпадающее меню городов

    (function () {

        function setInfo(address,number,mail){
            $('.city-adress').text(address);
            $('.city-number').text(number);
            $('.city-mail').text(mail);
        }
        function cityLoad() {
           var currentText = localStorage.getItem('cityChecked');
            var currentCity = localStorage.getItem('city');

            $('.dropdown-list__radio[value="'+currentCity+'"]').prop('checked',true); //set prop checked to element,from localstorage

                if(!currentText){
                    $('.dropdown-menu__link').text('Ваш город');
                }else{
                    $('.dropdown-menu__link').text(localStorage.getItem('cityChecked'));
                }

            switch(localStorage.getItem('city')){
                case 'piter':
                    return  setInfo('проспект Владимирский,82','8(927)-982-872','piter@mail.ru')
                case 'chelny':
                    return  setInfo('Проспект Набережночелнинский, строение1,2 офис','8(231)-12-872','chelny@mail.ru');
                case 'kazan':
                    return  setInfo('Фрунзе, строение2,2 офис','8(443)-12-872','kazan@mail.ru');

                case 'krasnodar':
                    return  setInfo('Мира, строение2,2 офис','8(213)-12-872','krasnodar@mail.ru');
                case 'sevastopol':
                    return  setInfo('Пушкина, строение2,2 офис','8(213)-12-872','seva@mail.ru');
                default:
                    return  setInfo('Каширское шоссе','8(22213)-12-872','asdsad@mail.ru');
            }
        }

        $(window).on('load',function () {
            cityLoad();
        })
            $('.dropdown-list__radio').on('change', function () {
                cityLoad();
            })
    })(); //вывести адреса и данные в футер контактов

})
