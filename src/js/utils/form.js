$(document).ready(function(){
    (function () {
           var message = 'заполните поле';
        var errors = [];
        function validate(){
            errors = [];

            $('.input').removeClass('input--success input--error')

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
            })
        }
        $('.btn--form').on('click',function () {
            validate();
            if (errors.indexOf(true)+1){
                return false
            }
        })
    })();
})