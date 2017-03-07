$(document).ready(function () {
    var sliderElem = $('.slider__line');
    var thumbElem = $('.slider__circle');

    thumbElem.mousedown(function (e) {
        var thumbCoords = getCoords(thumbElem),
        shiftX = e.pageX - thumbCoords.left, //only horizontal slider
        sliderCoords = getCoords(sliderElem);

        $(document).mousemove(function (e) {
            var newLeft = e.pageX - shiftX - sliderCoords.left;
            // out of flider
            if (newLeft < 0) {
                newLeft = 0;
            }
            var rightEdge = sliderElem.width() - thumbElem.width();
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            thumbElem.css('left', newLeft + 'px');

            function getMoney(){
                var monthPos = newLeft,
                    km = 8,
                    orderPrice = 245,
                    orderDay = 10,
                    dayPos = 6.4,
                    currentDay =Math.floor(monthPos/dayPos),
                    currentKm = currentDay*km*orderDay,
                    monthMoney = orderPrice*orderDay*currentDay;


                $('.slider__count--js').text(currentDay);
                $('.title-md--js-sum').text(monthMoney);
                $('.table__text-js-km').text(currentKm);
            }
            getMoney(); //set text information
        });
        $(document).mouseup(function() {
            $(this).off('mousemove');
            $(this).off('mouseup');
        });// stop slider

        return false; // disable selection start (cursor change)
    });

    thumbElem.on('dragstart', function () {
        return false;
    });// off html5 dragndrop

    function getCoords(elem) {
        var box = elem.offset();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

});