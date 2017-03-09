$(document).ready(function () {

    (function () {

        var cities = [
            {
                name: 'Набережные Челны',
                value: 'chelny',
                address: '',
                number: '',
                mail: ''
            },
            {
                name: 'Казань',
                value: 'kazan',
                address: 'Чистопольская 7, 1 эт',
                number: '89375809000 89600400512',
                mail: ''
            },
            {
                name: 'Санкт-Петербург',
                value: 'piter',
                address: 'ул. Ремесленная, д.17, оф. 301',
                number: '89110869488',
                mail: 'kirindil@yandex.ru'
            },
            {
                name: 'Краснодар',
                value: 'krasnodar',
                address: 'Р-н Фестивальный, Монтажников 3, офис 14, 2 этаж',
                number: '79615180501',
                mail: 'incarkrd@gmail.com'
            },
            {
                name: 'Екатеринбург',
                value: 'ekaterinburg',
                address: 'ул.Бебеля 112, автомагазин "Partera"',
                number: '+7-928-622-82-28',
                mail: 'gett.taxi@bk.ru'
            },
            {
                name: 'Самара',
                value: 'samara',
                address: 'ул. Галактионовская, дом 118а',
                number: '89276570102 ',
                mail: 'uber-63@yandex.ru'
            },
            {
                name: 'Сочи',
                value: 'sochi',
                address: 'Красноармейская, 3А, 6эт, 46кабинет',
                number: '+79884038890',
                mail: ''
            },
            {
                name: 'Уфа',
                value: 'ufa',
                address: 'ул. Менделеева 177 ТЦ "Чайка" 6 этаж',
                number: '8(347)2991722, 89093491722 ',
                mail: ''
            },
            {
                name: 'Воронеж',
                value: 'voronezh',
                address: 'Район Ленинский, Свободы 75А, офис 418, 4 этаж (БЦ Калина)',
                number: '+7(909)212-13-20',
                mail: 'gettvoz@gmail.com'
            },
            {
                name: 'Волгоград',
                value: 'volgograd',
                address: 'Район Дзержинский, ул. Землячки,д.58 ',
                number: '8-937-555-04-90',
                mail: 'lep.maks@gmail.com'
            }
        ];

        var items = cities.map(function (item) {
            return ('<li class="dropdown-list__item">' +
            '<label class="dropdown-list__label">' + item.name + '<input value="' + item.value + '" class="dropdown-list__radio" type="radio">' +
            '</label>' +
            '</li>')
        });
        $('.dropdown-menu__link').after('<ul class="dropdown-menu__list dropdown-list"></ul>');
        $('.dropdown-list').append(items);

        function setInfo(address, number, mail) {
            $('.city-adress').text(address);
            $('.city-number').text(number);
            $('.city-mail').text(mail);
        } // set city details

        function cityLoad() {
            var currentText = localStorage.getItem('cityChecked');
            var currentCity = localStorage.getItem('city');

            $('.dropdown-list__radio[value="' + currentCity + '"]').prop('checked', true); //set prop checked to element,from localstorage
            if (!currentText) {
                $('.dropdown-menu__link').text('Ваш город');
            } else {
                $('.dropdown-menu__link').text(localStorage.getItem('cityChecked'));
            }

            $.each(cities, function (i, city) {
                if (currentCity === city.value) { //check city details from  cities[]
                    setInfo(city.address, city.number, city.mail)
                }
            });
        }

        $(window).on('load', function () {
            cityLoad();
        });
        $('.dropdown-list__radio').on('change', function () {
            cityLoad();
        });
        (function ($) {

            $.fn.DropDown = function () {
                var self = this,
                    root = $(this).parents('.dropdown-menu');

                var list = ('.dropdown-list'),
                    dropdownMenu = ('.dropdown-menu'),
                    city = ('.dropdown-list__radio');

                function onCloseMenu() {
                    $('.arrow-down', root).removeClass('arrow-up');
                    $(list).slideUp('fast');
                }

                function onOpenMenu() {
                    $('.arrow-down', root).toggleClass('arrow-up');
                    $(list, root).slideToggle('fast');
                }

                this.on('click', function (e) {
                    e.preventDefault();
                    onCloseMenu();
                    root = $(this).parents('.dropdown-menu');
                    if ($(list, root).css('display') === 'none') {
                        onOpenMenu()
                    } else {
                        onCloseMenu()
                    }
                });

                $('.dropdown-list__label', '.dropdown-menu--city').on('click', function () {
                    var currentText = $('.dropdown-list__radio:checked', this).parent('label').text();// set title of this value
                    localStorage.setItem('city', $(city, this).val());
                    localStorage.setItem('cityChecked', currentText);

                    $('.arrow-down', root).removeClass('arrow-up');
                    $(list, root).slideUp('fast');
                    $('.dropdown-menu__link').text(currentText);

                    $(city).not($(city, this)).prop('checked', false);

                })
                $(document).on('click', function (e) {

                    if (!(self.is(e.target) && self.has(e.target).length === 0)) {
                        onCloseMenu();
                    }
                }); //click out this element

            }
            return this
        })($);// выпадающее меню городов
    })();

});
