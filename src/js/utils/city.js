$(document).ready(function () {

    function ajax() {

        return $.ajax({
            dataType: "json",
            url: '/cities.json',
            success: function (cities) {

                var cityArr = cities;

                var items = cityArr.map(function (item) {
                    return ('<li class="dropdown-list__item">' +
                    '<label class="dropdown-list__label">' + item.name + '<input value="' + item.value + '" class="dropdown-list__radio" type="radio">' +
                    '</label>' +
                    '</li>')
                });
                $('.dropdown-menu__link').after('<ul class="dropdown-menu__list dropdown-list"></ul>');
                $('.dropdown-list').append(items);

                renderCityData(cityArr);
            }
        });
    }

    function renderCityData(cityArr) {

        var currentCity = localStorage.getItem('city');

        if (typeof ymaps == "undefined" || !ymaps) {
            return false;
        }
        else {
            ymaps.ready(function init() {
                var yaCity = ymaps.geolocation.city;


                if (!yaCity || yaCity === undefined) {
                    console.log('fail to check city from yandex API')
                    return false;

                } else {
                    var url = yaCity.split(" ");
                    location.hash = ('city=' + url.join("+")); //write to url
                }
                ;

                $.each(cityArr, function (i, city) {
                    if (yaCity === city.name && !currentCity) { //check city details from  cities[]
                        localStorage.setItem('city', city.value);
                        localStorage.setItem('cityChecked', city.name);
                    }
                });
                updateCityData(cityArr);
            });

        }

    };
    function updateCityData(cityArr) {
        var currentCityText = localStorage.getItem('cityChecked'),
            currentCity = localStorage.getItem('city');

        if (currentCityText) {
            $('.dropdown-menu__link').text(localStorage.getItem('cityChecked'));
        } else {
            $('.dropdown-menu__link').text('Ваш город');
        };

        $('.dropdown-list__radio[value="' + currentCity + '"]').prop('checked', true); //set prop checked to element,from localstorage
        $.each(cityArr, function (i, city) {
            if (currentCity === city.value) { //check city details from  cities[]
                $('.city-adress').text(city.address);
                $('.city-number').text(city.number);
                $('.city-mail').text(city.mail);
            }
        })
    }

    (function ($) {
        $.fn.DropDown = function () {
            var self = this,
                root = $(this).parents('.dropdown-menu');

            var list = ('.dropdown-list'),
                dropdownMenu = ('.dropdown-menu'),
                city = ('.dropdown-list__radio');

            this.onCloseMenu = function () {
                $('.arrow-down', root).removeClass('arrow-up');
                $(list).slideUp('fast');
            };
            this.onOpenMenu = function () {
                $('.arrow-down', root).toggleClass('arrow-up');
                $(list, root).slideToggle('fast');
            };
            this.on('click', function (e) {
                e.preventDefault();
                self.onCloseMenu();
                root = $(this).parents('.dropdown-menu');
                if ($(list, root).css('display') === 'none') {
                    self.onOpenMenu()
                } else {
                    self.onCloseMenu()
                }
            });
            this.onItemClick = function () {
                ajax().done(function (cityArr) {
                    $('.dropdown-list__label', '.dropdown-menu--city').on('click', function () {
                        $(city).not($(city, this)).prop('checked', false);

                        var currentText = $('.dropdown-list__radio:checked', this).parent('label').text();// set title of this value

                        localStorage.setItem('city', $(city, this).val());
                        localStorage.setItem('cityChecked', currentText);

                        self.onCloseMenu();
                        $('.dropdown-menu__link').text(currentText);
                        updateCityData(cityArr); //reload data cheked city
                    });
                });

            };
            this.onOutClick = function () {
                $(document).on('click', function (e) {
                    if (!(self.is(e.target) && self.has(e.target).length === 0)) {
                        self.onCloseMenu();
                    }
                }); //click out this element
            };
            this.onItemClick();
            this.onOutClick();
        };
        return this
    })($);// выпадающее меню городов

});
