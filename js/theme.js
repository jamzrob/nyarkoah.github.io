'use strict';

$(window).on('load', function () {
    /*------- Preloader --------*/
    $('#preloader').delay(1000).fadeOut(200);

    /*------------------- Style Switcher Files  -------------------*/
//    $('head').append('<link href="assets/css/multicolor/theme-color.css" rel="stylesheet" id="theme-config-link" />');
//    $('head').append('<script src="assets/js/theme-config.js" type="text/javascript"></script>');
//    $('head').append('<script src="assets/js/jquery.cookie.js" type="text/javascript"></script>');
    /*------------------- ./Style Switcher Files  -------------------*/
});

$(window).on('scroll', function () {
    /*------- Scroll To Top --------*/
    if ($(this).scrollTop() > 100) {
        $('.to-top').css({bottom: '0px'});
    }
    else {
        $('.to-top').css({bottom: '-150px'});
    }

});

$(function () {

    // --------------------------- Sticky Header ------------------------ //
    (function () {
        if ($(window).width() > 760) {
            $(".menu-bar").sticky({topSpacing: 0});
        }
    }());

    /*------- Search Popup --------*/
    (function ($) {
        'use strict';
        // Popup for Menu and Search Links in the Header
        $('.search').on('click', function () {
            $('.search-popup').fadeIn(250);
            $('.search-popup .search-query').focus();
        });
        $('.close-search').on('click', function () {
            $('.search-popup').fadeOut(250);
        });
    })($);

    /*------- Scroll To Top Animate --------*/
    (function () {
        $('.to-top').on('click', function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });
    }());

    /*------- Scroll To Top Animate --------*/
    if ($('.testimonial-slider').length > 0) {
        $('.testimonial-slider').owlCarousel({
            items: 1,
            rtl: false,
            loop: true,
            dots: true,
            nav: true,
            autoplay: true,
            responsive: {
                0: {items: 1}
            },
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }

    if (($('body > main div').hasClass('wow'))) {
        new WOW().init();
    }

    /* --------------------------- Coundown Timer ------------------------ */
    (function () {
        if ($("#countdown-timer1").length) {
            $("#countdown-timer1").countdown("2017/05/18", function (event) {
                var $this = $(this).html(event.strftime(''
                        + '<span>%D</span> days '
                        + '<span>%H</span> hours '
                        + '<span>%M</span> mins '
                        + '<span>%S</span> secs'));
            });
        }
    }());

    /*------- Google Map --------*/
    (function () {
        var LocationData = [
            [49.2812668, -123.1035942, "26 E Hastings St, Vancouver"],
            [49.2814064, -123.1025187, "71 E Hastings St, Vancouver"],
            [49.2812336, -123.1020622, "122 E Hastings St, Vancouver"],
            [49.2813564, -123.1012253, "138 E Hastings St, Vancouver"],
            [49.2811625, -123.0985032, "242 E Hastings St, Vancouver"]
        ];

        function initialize()
        {
            var map = new google.maps.Map(document.getElementById('map-canvas'));
            var bounds = new google.maps.LatLngBounds();
            var infowindow = new google.maps.InfoWindow();

            for (var i in LocationData)
            {
                var p = LocationData[i];
                var latlng = new google.maps.LatLng(p[0], p[1]);
                bounds.extend(latlng);

                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: p[2]
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(this.title);
                    infowindow.open(map, this);
                });
            }

            map.fitBounds(bounds);
        }

        try {
            google.maps.event.addDomListener(window, 'load', initialize);
        } catch (e) {
            console && console.error(e.message);
        }

    }());

    /*------- Calculator --------*/
    (function () {

        if (typeof $.fn.databinder == 'undefined')
        {
            return;
        }

        $('.calculate-form').on('changed.bs.select', function () {
            $(this).trigger('recalculate');
        }).on('keyup', ':input', function () {
            $(this).trigger('recalculate');
        }).databinder({
            money: {
                decimals: 2,
                separator: '.',
                thousands: ' ',
                cutzero: false
            },
            calculate: function (data, callback) {
                try {
                    // Example: minimal cost
                    data.min = 15;
                    // Example: price per kilometer per kilo
                    data.price = 0.01;
                    // Example: distance between locations
                    data.distance = 350;
                    // Example: cubic cm into virtual weight
                    data.volume_coefficient = 0.08;

                    data.volume = data.width * data.height * data.depth / 1000;
                    data.volume_weight = data.volume * data.volume_coefficient;

                    var weight = Math.max(data.weight, data.volume_weight);
                    var cost = data.price * data.distance * weight;

                    if (typeof data.package == 'string' && data.package) {
                        try {
                            eval('cost = ' + data.package + ';');
                        } catch (e) {
                        }
                    }

                    cost = Math.max(cost, data.min);

                    data.cost = cost ? cost : null;

                    callback(data);

                } catch (e) {
                    console && console.log(e.message);
                }
            }
        });

    }());

});

