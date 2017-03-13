$(document).ready(function () {

    function Cities() {
        var cityArr = [];

        this.getData = function () {
            $.ajax({
                dataType: "json",
                url: 'js/cities.json',
                async: false,
                success: function (cities) {
                    cityArr = cities;
                }
            });
        };

        this.onRenderCities = function () {
            var items = cityArr.map(function (item) {
                return ('<li class="dropdown-list__item">' +
                '<label class="dropdown-list__label">' + item.name + '<input value="' + item.value + '" class="dropdown-list__radio" type="radio">' +
                '</label>' +
                '</li>')
            });
            $('.dropdown-menu__link').after('<ul class="dropdown-menu__list dropdown-list"></ul>');
            $('.dropdown-list').append(items);
        };

        this.onCheckGeo = function () {
            ymaps.ready(function init (){
                var yaCity = ymaps.geolocation.city,
                currentCity = localStorage.getItem('city');

                if (!yaCity || yaCity === undefined){
                    console.log('fail to check city from yandex API')
                    return false;

                }else{
                    var urlArr = yaCity.split(" ");
                    location.hash = ('?city='+ urlArr.join("+")); //write to url

                    $.each(cityArr, function (i, city) {
                        if (yaCity === city.name && !currentCity) { //check city details from  cities[]
                            localStorage.setItem('city', city.value);
                            localStorage.setItem('cityChecked', city.name);
                        }
                    });
                }
            });
        };
        this.onRenderFooter = function () {
            var currentCityText = localStorage.getItem('cityChecked');
            var currentCity = localStorage.getItem('city');

            $('.dropdown-list__radio[value="' + currentCity + '"]').prop('checked', true); //set prop checked to element,from localstorage
            if (currentCityText) {
                $('.dropdown-menu__link').text(localStorage.getItem('cityChecked'));
            } else {
                $('.dropdown-menu__link').text('Ваш город');
            }
            $.each(cityArr, function (i, city) {
                if (currentCity === city.value) { //check city details from  cities[]
                    $('.city-adress').text(city.address);
                    $('.city-number').text(city.number);
                    $('.city-mail').text(city.mail);
                }
            });
        };
    };

    var CitiesList = new Cities();
    CitiesList.getData();
    CitiesList.onRenderCities();
    CitiesList.onCheckGeo();
    setTimeout(function () {
        CitiesList.onRenderFooter();
    },2000);

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
                $('.dropdown-list__label', '.dropdown-menu--city').on('click', function () {
                    $(city).not($(city, this)).prop('checked', false);

                    var currentText = $('.dropdown-list__radio:checked', this).parent('label').text();// set title of this value

                    localStorage.setItem('city', $(city, this).val());
                    localStorage.setItem('cityChecked', currentText);

                    self.onCloseMenu();
                    $('.dropdown-menu__link').text(currentText);

                    CitiesList.onRenderFooter();
                })
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
