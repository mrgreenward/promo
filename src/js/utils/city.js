$(document).ready(function () {


    function Cities(){
        this.onRender = function () {
            $.ajax({
                url: 'js/cities.json',
                dataType: 'json',
                success: function (cities) {

                    var items = cities.map(function (item) {
                        return ('<li class="dropdown-list__item">' +
                        '<label class="dropdown-list__label">' + item.name + '<input value="' + item.value + '" class="dropdown-list__radio" type="radio">' +
                        '</label>' +
                        '</li>')
                    });
                    $('.dropdown-menu__link').after('<ul class="dropdown-menu__list dropdown-list"></ul>');
                    $('.dropdown-list').append(items);

                    var currentText = localStorage.getItem('cityChecked');
                    var currentCity = localStorage.getItem('city');
                    $('.dropdown-list__radio[value="' + currentCity + '"]').prop('checked', true); //set prop checked to element,from localstorage
                    if (!currentText) {
                        $('.dropdown-menu__link').text('Ваш город');
                    } else {
                        $('.dropdown-menu__link').text(localStorage.getItem('cityChecked'));
                    };

                    function cityLoad() {

                        function renderFooter (address, number, mail) {
                            $('.city-adress').text(address);
                            $('.city-number').text(number);
                            $('.city-mail').text(mail);
                        } // set city details

                        $.each(cities, function (i, cityItem) {
                            var currentCity = localStorage.getItem('city');
                            if (currentCity === cityItem.value) { //check city details from  cities[]
                                renderFooter(cityItem.address, cityItem.number, cityItem.mail)
                            }
                        });
                    }
                    $('.dropdown-list__radio').on('change', function () {
                        cityLoad();
                    });
                }
            });
        };
        this.onDropDown = function () {
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
                    }
                    this.onOutClick = function () {
                        $(document).on('click', function (e) {
                            if (!(self.is(e.target) && self.has(e.target).length === 0)) {
                                self.onCloseMenu();
                            }
                        }); //click out this element
                    };
                    this.onItemClick = function () {
                        $('.dropdown-list__label', '.dropdown-menu--city').on('click', function () {
                            var currentText = $('.dropdown-list__radio:checked', this).parent('label').text();// set title of this value
                            localStorage.setItem('city', $(city, this).val());
                            localStorage.setItem('cityChecked', currentText);

                            self.onCloseMenu();

                            $('.dropdown-menu__link').text(currentText);
                            $(city).not($(city, this)).prop('checked', false);
                        })
                    }
                    this.on('click', function (e) {
                        e.preventDefault();
                        self.onCloseMenu();

                        root = $(this).parents('.dropdown-menu');
                        if ($(list, root).css('display') === 'none') {
                            self.onOpenMenu()
                        } else {
                            self.onCloseMenu();
                        }
                    });
                    this.onItemClick();
                    this.onOutClick();
                }
                return this
            })($);// выпадающее меню городов
        }
    }
var citiesList = new Cities();
    citiesList.onRender();
    citiesList.onDropDown();


});
