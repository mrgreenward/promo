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
                        stopVideo($('.modal__video', modal)); // call function from youtube.js to stop video
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