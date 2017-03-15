$(document).ready(function () {
    (function () {
        var message = 'заполните поле';
        var errors = [];

        function validate() {
            errors = [];

            $('.input').removeClass('input--success input--error');
            $('.nav__link', '.form__city').removeClass('error');

            $('.input').each(function (i, el) {
                var val = $(el).val();

                val = $.trim(val);

                if (!val) {
                    $(el).addClass('input--error').attr('placeholder', message);
                    errors.push(true);
                } else {
                    $(el).addClass('input--success').attr('placeholder', '');
                    errors.push(false);
                }
                $(el).val(val)
            });// check values from inputs

            var cityVal = $('.dropdown-list__radio:checked', '.form').val();
            if (!cityVal) { //check city checked
                $('.nav__link', '.form__city').addClass('error');
                errors.push(true);
            } else {
                $('.nav__link', '.form__city').addClass('success');
                errors.push(false);
            }
        }
        function sendData() {
            var serverUrl = '/driver/sendform.php';

            var city = $('.dropdown-list__radio:checked', '.form').val(),
                name = $('.input--surname', '.form').val(),
                surname = $('.input--fo', '.form').val(),
                car = $('.input--car', '.form').val(),
                phone = $('.input--number', '.form').val();

            $.ajax({
                url: serverUrl,
                timeout: 30 * 1000,
                type: 'GET',
                dataType: 'json',
                data: {
                    "city": city,
                    "name": name,
                    "surname": surname,
                    "car": car,
                    "phone": phone
                },
                cache: false,
                beforeSend: function (jqXHR, settings) {
                    $('.btn--form').prop('disabled', true);
                },
                success: function (data, textStatus, jqXHR) {
                    /*    console.log(data, textStatus, jqXHR);*/
                    $('.btn--form').attr('data-modal', '.modal-success').Modal();

                },
                fail: function (jqXHR, textStatus) {
                    console.log('jqXHR, textStatus');
                    $('.btn--form').prop('data-modal', null).attr('data-modal', '.modal-fail').Modal();
                },
                complete: function (jqXHR, textStatus) {
                    $('.form').trigger('reset');
                    $('.btn--form').prop('disabled', false);
                }
           });
        }

        $('.btn--form').on('click', function (e) {
            var self = $(this);
            e.preventDefault();
            validate();
            if (errors.indexOf(true) + 1) {
                return false
            }
            ;
            sendData();
        })
    })();
})