var svgID = 'new-wall';
var svgVectorGroup = 'layer1';
var articles;

$(document).ready(function() {


    var svgc = document.querySelector('svg');

    [...svgc.querySelectorAll('a')].forEach(
        anchor => {
            anchor.addEventListener('click', svg_a_click);
            anchor.title = anchor.getAttributeNS(
                'http://www.w3.org/1999/xlink',
                'title'
            );
            anchor.href = anchor.getAttributeNS(
                'http://www.w3.org/1999/xlink',
                'href'
            );
        });

    articles = [...$(svgc).find("a[*|title]").map(
        (i, el) => {
            console.log(el.title)
            return [[
                el.title,
                el.href,
                el
            ]];
        })]
        .reduce(
            (articles, t) => {
                articles[t[0]] = {url: t[1], node: t[2]};
                return articles;
            }, {});


    let titles = [...new Set(Object.values(articles).map(
        tdata =>
            decodeURIComponent(
                tdata.url.baseVal
                    .split('/')
                    .pop()
                    .replace(/\+/g, ' ')
                    .replace(/_/g, ' ')
            )
    ))];


    for (let i = 0, j = titles.length; i < j; i += 50) {
        var temp_titles = titles.slice(i, i + 50).join('|');
        $.ajax({
            url: 'https://theportal.wiki/api.php',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                action: 'query',
                format: 'json',
                prop: 'extracts|info',
                list: '',
                titles: temp_titles,
                utf8: '1',
                exintro: '1',
                exsectionformat: 'wiki',
                inprop: 'url',
            },
            success: function(response) {
                console.log('success response');
                for (let k in response.query.pages) {
                    console.log('pages handle');
                    let pdata = response.query.pages[k];
                    article = Object.values(articles).filter(
                        article => article.url.baseVal.replace('http:', 'https:') == pdata.fullurl.replace('http:', 'https:'));
                    if (article) {
                        article[0].html = pdata.extract;
                    }
                }
                for (let title in articles) {
                    let article = articles[title];
                    //TODO
                    console.log(article);
                    console.log($('.article:first').clone());
                    let article_el = $('.article:first').clone().appendTo('#sidebar-content');
                    article_el.data('title', title).attr('title', title).find('.article-title a').text(title).attr('href', article.url);
                    if (article.html)
                        article_el.find('.article-content').html(article.html);
                   //if (is_ff)
                   //    article_el.show();
                    article.article_el = article_el;
                }
                $('#sidebar-content').on('mouseenter', '.article-title', e => {
                    $(articles[$(e.target).parents('.article').data('title')].node).css('outline', '1px solid #f00');
                }).on('mouseleave', '.article-title', e => {
                    $(articles[$(e.target).parents('.article').data('title')].node).css('outline', 'none');
                });
                MathJax.typeset();
            }
        });
    }


    $('#scene').click(function() {
        var wall = $('#wall');
        var svg = document.getElementById(svgVectorGroup);
        var wobble_in_duration = 350;
        var wobble_out_duration = 600;
        var fall_inward_duration = 650;
        var scene_fade_out_duration = 5000;
        wall

        // wobble old wall into screen
            .queue(function(next) {
                wall.css('transition-duration', wobble_in_duration+'ms');
                wall.addClass('wobble-in',);
                next();
            })
            .delay(wobble_in_duration+10)

        // wobble old wall out of screen
            .queue(function(next) {
                wall.css('transition-duration', wobble_out_duration+'ms');
                wall.addClass('wobble-out');
                wall.removeClass('wobble-in');
                next();
            })
            .delay(wobble_out_duration+10)

        // knock over old wall inward
            .queue(function(next) {
                wall.css('transition-duration', fall_inward_duration+'ms');
                wall.css(
                    "transition-timing-function",
                    "cubic-bezier(.53,.07,.74,.35)");
                wall.addClass('fallen');
                wall.removeClass('wobble-out');
                next();
            })
            .delay(fall_inward_duration)

        // swap old wall texture to shattered version
            .queue(function(next) {
                $('#texture-broken').css('display', 'block');
                $('#texture').hide();
                next();
            })

        // spawn new wall
            .queue(function(next) {
                // smoothZoom takes in (x,y,scale)
                panzoom(svg).smoothZoom(
                    $(window).width()/2,
                    $(window).height()/2 + $(window).height()/2,
                    1.3 // scale by this factor
                );
                $('#new-wall').css('opacity', '1.0');
                $('#new-wall').css('z-index', '1');
                next();
            })

        // fade out old wall
            .queue(function(next) {
                $('#scene').css('transition-duration', scene_fade_out_duration + 'ms');
                $('#scene').css('opacity', '0.0');
                next();
            })
            .delay(scene_fade_out_duration)

        // remove out old wall
            .queue(function(next) {
                $('#scene').remove();
            });
    });
});

window.addEventListener('load', function () {
    var svg = document.getElementById(svgVectorGroup);
	  var instance = panzoom(svg, {
        zoomSpeed: 0.050,
        pinchSpeed: 0.5,
        bounds: true,
    }).zoomAbs(
        $(window).width()/2,
        $(window).height()/2,
        0.33
    );
});


function svg_a_click(e) {
    e.preventDefault();
    e.stopPropagation();
    var a = $(e.target);
    if (a[0].tagName != 'a')
        a = a.parents('a');
    a = a[0];
    if ('title' in a &&
        a.title in articles) {
        console.log('click el')
        let article_el = articles[a.title].article_el;
        article_el.show();
        $('#sidebar').animate({scrollTop: article_el[0].offsetTop}, 400);
        console.log(article_el);
    }
    return false;
}

