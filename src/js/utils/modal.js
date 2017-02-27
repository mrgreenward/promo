$(document).ready(function () {
    (function ($) {
        $.fn.Modal = function () {
            return this.each(function () {
                var $this = $(this);

                var $modal = $('.modal--js'),
                    backdropEl = '<div class="modal-backdrop"></div>';

                $this.on('click', function (e) {
                    e.preventDefault();

                    $modal.after(backdropEl);
                    $('.modal-backdrop').fadeIn(200, function () {
                        $modal.css('display', 'block').animate({opacity: 1}, 100);
                    });

                    $('.modal__close,.modal-backdrop').on('click', function () {
                        $modal.animate(200, function () {
                            $(this).css('display', 'none');
                            $('.modal-backdrop').fadeOut(200, function () {
                                $(this).remove();
                            });
                        });
                    });

                })
            })
        }
    })($)
})