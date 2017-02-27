$(document).ready(function() {
    (function ($) {
        $.fn.Modal = function(){
            var modal =  $('.modal--js'),
                backdropEl = '<div class="modal-backdrop"></div>'
            this.on('click', function (e) {
                e.preventDefault()
                modal.toggleClass('modal-js--open').after(backdropEl);
                $('.modal-backdrop').addClass('modal-backdrop--in');

                $('.modal__close,.modal-backdrop').on('click',function () {
                modal.removeClass('modal-js--open');
               $('.modal-backdrop').remove();
            });

            })
        }
    })($)
})