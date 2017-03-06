$(document).ready(function(){
    (function () {
           var message = 'заполните поле';
        var errors = [];

        function validate(){
            errors = [];

            $('.input').removeClass('input--success input--error');
            $('.nav__link', '.form__city').removeClass('error');

            $('.input').each(function (i,el) {
                var val = $(el).val();

                val = $.trim(val);

                if (!val){
                    $(el).addClass('input--error').attr('placeholder', message);
                    errors.push(true);
                }else{
                    $(el).addClass('input--success').attr('placeholder', '');
                    errors.push(false);
                }
                $(el).val(val)
            });// check values from inputs

            var cityVal = $('.dropdown-list__radio:checked', '.form').val();
            if (!cityVal && !localStorage.getItem('city')){ //check city checked
                $('.nav__link', '.form__city').addClass('error');
                errors.push(true);
            }else{
                $('.nav__link', '.form__city').addClass('success');
                errors.push(false);
            }


        }

        function sendData(){
            var serverUrl = 'http://192.168.1.153:8080/form/';

            var city = $('.dropdown-list__radio:checked', '.form').val(),
                surName = $('.input--surname', '.form').val(),
                lastName = $('.input--fo', '.form').val(),
                car = $('.input--car', '.form').val(),
                number = $('.input--number', '.form').val();
           /* fetch('serverUrl', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "city": city,
                    "surName": surName,
                    "lastName": lastName,
                    "car":car,
                    "number":number
                }),
            }).then(function (response) {
                $('.btn--form').prop("disabled",true);
                return response.json();

            }).then(function (json) {
                console.log('success: ', json)
            }).catch(function (ex) {
                console.log('failed: ', ex)
            });*/
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                url: serverUrl,
                timeout: 30 * 1000,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    "city": city,
                    "surName": surName,
                    "lastName": lastName,
                    "car":car,
                    "number":number
                }),
                cache: false,
                beforeSend: function (jqXHR, settings) {
                    $('.btn--form').prop('disabled',true);
                },
                success: function (data, textStatus, jqXHR) {
                    console.log(data, textStatus, jqXHR);
                },
                fail: function (jqXHR, textStatus) {
                    console.log(jqXHR, textStatus);
                },
                complete: function (jqXHR, textStatus) {
                    $('.form').trigger('reset');
                    $('.btn--form').prop('disabled',false);
                }
            });
        }

        $('.btn--form').on('click', function (e) {
            e.preventDefault();
            validate();
            if (errors.indexOf(true) + 1) {
                return false
            };
            sendData();
        })
    })();
})