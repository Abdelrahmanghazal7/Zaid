var activeBalloon = null;
var isBeingDragged = false;

function loopBalloon(index) {
    var randleft = window.innerWidth * Math.random();
    var randtop = window.innerHeight * Math.random();

    $('#b' + index).animate({ left: randleft, bottom: randtop }, {
        duration: 10000,
        step: function (now, fx) {
            if (isBeingDragged && fx.prop === "left") {
                $(this).stop();
            }
        },
        complete: function () {
            if (!isBeingDragged) {
                loopBalloon(index);
            }
        }
    });

    $('#b' + index).on('mousedown touchstart', function (e) {
        activeBalloon = $(this);
        isBeingDragged = true;
        e.preventDefault();
        e.stopPropagation();
    });
}

function initializeBalloons() {
    for (var i = 1; i <= 9; i++) {
        loopBalloon(i);
    }
}

function bringBackBalloons() {
    $('.balloon-border').stop().animate({ top: 0 }, 800);

    $('.balloon').removeClass('balloons-rotate-behaviour-one balloons-rotate-behaviour-two');

    initializeBalloons();
}

$(document).on('mousemove touchmove', function (e) {
    if (activeBalloon) {
        var pageX = e.pageX || e.originalEvent.touches[0].pageX;
        var pageY = e.pageY || e.originalEvent.touches[0].pageY;

        activeBalloon.css({
            left: pageX - activeBalloon.width() / 2,
            bottom: $(window).height() - pageY - activeBalloon.height() / 2
        });
    }
});

$(document).on('mouseup touchend', function () {
    if (activeBalloon) {
        isBeingDragged = false;

        activeBalloon.animate({ bottom: "-=5" }, 200).animate({ bottom: "+=5" }, 200, function () {
            bringBackBalloons();
        });
    }
    activeBalloon = null;
});

$('.birthdayCard').on('click touchstart', function (e) {
    e.preventDefault();
    $(this).toggleClass('opened');
    setTimeout(() => {
        $(this).toggleClass('hide');
    }, 100);
});

function balloons() {
    $('.balloon-border').animate({ top: -500 }, 8000);
    $('#b1,#b4,#b5,#b7,#b9').addClass('balloons-rotate-behaviour-one');
    $('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');
    initializeBalloons();
}

balloons();