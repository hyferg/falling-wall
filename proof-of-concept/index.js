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
                $('#texture').hide();
                $('#texture-broken').show();
                next();
            });

    });
});
