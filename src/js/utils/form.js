$(document).ready(function(){
    (function(){
        var  form = $('.form'),
            fieldError = ('input--error'),
            fieldSuccess = ('input--success');
        var message = 'заполните пустые поля!';
      formVal = {
          'checkNull': function () {
              $('.form .input').removeClass(fieldSuccess).removeClass(fieldError);

                $('.form .input').each(function (i, el) {
                    if ($(this).val().length <= 0){
                        formVal.errors = true;
                        $(this).removeClass(fieldSuccess).addClass(fieldError);
                        $('.input--error').attr('placeholder', message);
                        return false
                    }else{
                        formVal.errors = false;
                        $(this).removeClass(fieldError).addClass(fieldSuccess);
                    }
                })
          },
          'send': function () {
              if(!formVal.errors){
                  form.submit();
              }
          }
      }
     $('.btn--form').on('click',function () {
         formVal.checkNull();
         formVal.send();
         return false;
     })
    })();
})