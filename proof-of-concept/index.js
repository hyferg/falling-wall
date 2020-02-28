

$(document).ready(function() {
    $('#scene').click(function() {
        d1 = 350;
        d2 = 600;
        d3 = 650;
        var wall = $('#wall');
        wall
            .queue(function(next) {
                wall.css('transition-duration', d1+'ms');
                wall.addClass('wobble-in',);
                next();
            })
            .delay(d1+10)

            .queue(function(next) {
                wall.css('transition-duration', d2+'ms');
                wall.addClass('wobble-out');
                wall.removeClass('wobble-in');
                next();
            })
            .delay(d2+10)

            .queue(function(next) {
                wall.css('transition-duration', d3+'ms');
                wall.css(
                    "transition-timing-function",
                    "cubic-bezier(.53,.07,.74,.35)");
                wall.addClass('fallen');
                wall.removeClass('wobble-out');
                next();
            })
            .delay(d3)

            .queue(function(next) {
                // the new texture dimensions is the same size with scaled down assets
                // this means it's not volume preserving
                $('#texture-broken').css('display', 'block');
                $('#texture').hide();
                next();
            })
            .queue(function(next) {

                var svg = document.getElementById('layer1');
                var center_w = $(window).width()/2;
                var center_h = $(window).height()/2;
                panzoom(svg).smoothZoom(
                    center_w,
                    center_h+$(window).height()/2,
                    1.3);
                next();
                $('#new-wall').css('opacity', '1.0');
                $('#new-wall').css('z-index', '1');


            })
        ;
    });
});

window.addEventListener('load', function () {
	  // The `g4` element is inside svg with `viewBox` and
	  // it has the initial `transform`. Panzoom should still work fine.
    var svg = document.getElementById('layer1');
    var center_w = $(window).width()/2;
    var center_h = $(window).height()/2;
	  var instance = panzoom(svg, {
        zoomSpeed: 0.050,
        pinchSpeed: 0.5,
        bounds: true,
    }).zoomAbs(
        center_w,
        center_h,
        0.33
    );
});
