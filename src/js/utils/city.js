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
                    return  setInfo('ул. Ремесленная, д.17, оф. 301','89110869488','kirindil@yandex.ru')
                case 'chelny':
                    return  setInfo('','','');
                case 'kazan':
                    return  setInfo('Чистопольская 7, 1 эт','89375809000, 89600400512', '');
                case 'krasnodar':
                    return  setInfo('Р-н Фестивальный, Монтажников 3, офис 14, 2 этаж','79615180501','incarkrd@gmail.com');
                case 'ekaterinburg':
                    return  setInfo('ул.Бебеля 112, автомагазин "Partera"','+7-928-622-82-28','gett.taxi@bk.ru');
                case 'samara':
                    return  setInfo('ул. Галактионовская, дом 118а','89276570102 ','uber-63@yandex.ru');
                case 'sochi':
                    return  setInfo('Красноармейская, 3А, 6эт, 46кабинет','+79884038890','');
                case 'ufa':
                    return  setInfo('ул. Менделеева 177 ТЦ "Чайка" 6 этаж','8(347)2991722, 89093491722 ','');
                case 'voronezh':
                    return  setInfo('Район Ленинский, Свободы 75А, офис 418, 4 этаж (БЦ Калина)','+7(909)212-13-20','gettvoz@gmail.com');
                case 'volgograd':
                    return  setInfo('Район Дзержинский, ул. Землячки,д.58 ','8-937-555-04-90','lep.maks@gmail.com');
                default:
                    return  setInfo('');
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
