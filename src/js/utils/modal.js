$(document).ready(function () {
    (function ($) {
        $.fn.Modal = function () {
            return this.each(function () {
                var $this = $(this);

                var modal = $(this).data('modal'),
                    backdropEl = '<div class="modal-backdrop"></div>';

                $this.on('click', function (e) {
                    e.preventDefault();
                    
                    $(modal).after(backdropEl); //добавить элемент стенку
                    $('.modal-backdrop').fadeIn(100, function () {
                        $(modal).css('display', 'block').animate({opacity: 1}, 100); //анимация
                    });

                    $('.modal__close,.modal-backdrop').on('click', function () {

                        $('.modal iframe').attr("src", $('.modal iframe').attr("src")); //stop youtube video
                        $(modal).animate(200, function () {
                            $(this).css('display', 'none');
                            $('.modal-backdrop').fadeOut(100, function () {
                                $(this).remove();
                            });
                        });
                    });

                })
            })
        }
    })($)
})