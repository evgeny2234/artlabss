/*
 Project Name : Skuire
 Author Company : Grow Scales
 Project Date: 30-07-2016
 Author Website : http://growscales.com/
 */
/*
 1. Loader
 2. Pretty Photo
 3. Accordion
 4. Parallax
 5. Banner Slider
 6. Gallery
 7. Testimonials Slider
 8.Logo Slider
 9.Screen Height
 10.On Load scroll top
 11.Skill
 12. Counter function
 13. scroll to top
 14.Count Down
 15.Contact Form
 16. Animation
 17.Mobile Menu
 */

(function($) {
    "use strict";
    //$("#loading").delay(2000).fadeOut(500);
    $(window).load(function() {
        $("#loading").fadeOut(500);
    });

    //pretty photo function call
    $("a[data-gal^='prettyPhoto']").prettyPhoto({
        hook: 'data-gal',
        social_tools: false
    });
    //================================================
    //Accordion
    //=================================================
    var selectIds = $('#panel1,#panel2,#panel3');
    selectIds.on('show.bs.collapse hidden.bs.collapse', function() {
        $(this).prev().find('.fa').toggleClass('fa-plus fa-minus');
    });

    /*--------------------------------------------------
     Parallax
     ---------------------------------------------------*/
    $(window).stellar({
        responsive: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        horizontalOffset: 0,
        verticalOffset: 0
    });

    //================================================
    //Banner Slider
    //=================================================
    $("#banner-slider").owlCarousel({

        navigation: false, // Show next and prev buttons
        slideSpeed: 900,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        pagination: false,
        transitionStyle: "goDown",
        autoPlay: true,
        lazyEffect: "fade"
    });

    //================================================
    //Gallery
    //=================================================
    $('.categories').on('click', 'a', function() {
        $('.categories ul li').removeClass('active');
        $(this).parent('li').addClass('active');
        var itemSelected = $(this).attr('data-filter');
        $('.portfolio-item').each(function() {
            if (itemSelected == '*') {
                $(this).removeClass('filtered').removeClass('selected');
                return;
            } else if ($(this).is(itemSelected)) {
                $(this).removeClass('filtered').addClass('selected');
            } else {
                $(this).removeClass('selected').addClass('filtered');
            }
        });
    });
    //=======================================
    // Testimonial
    //=======================================

    var owl = $("#testimonial-slider");
    owl.owlCarousel({
        navigation: false,
        singleItem: true,
        transitionStyle: "goDown",
        autoPlay: true
    });

    //===================================================
    // Logo Slider
    //===================================================
    var owl = $("#partner-slider");

    owl.owlCarousel({

        itemsCustom: [
            [0, 1],
            [450, 1],
            [600, 7],
            [700, 4],
            [1000, 5],
            [1200, 5],
            [1400, 5],
            [1600, 6]
        ],
        navigation: false

    });
    //============================================
    //404 height
    //=============================================
    $("#error-page,#coming-soon,#main-banner,#banner-text").css({
        'height': window.innerHeight
    });

    $(window).resize(function() {
        $("#error-page,#coming-soon,#main-banner,#banner-text").css({
            'height': window.innerHeight
        });
    });

    //===============================================
    //On load Scroll Top
    //===============================================
    $('html, body').scrollTop(0);

    $(window).on('load', function() {
        setTimeout(function() {
            $('html, body').scrollTop(0);
        }, 0);
    });

    //===============================================
    //Scroll to top
    //================================================
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function() {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });
    //smooth scroll to top
    $back_to_top.on('click', function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, scroll_top_duration);
    });

    //================================================
    // count down
    //================================================
    $('#countdown').countdown('2016/08/29', function(event) {
        $(this).html(event.strftime('<div class="days count-down"><div class="inner"><span class="number">%-D</span><span class="string">%!D:Day,Days;</span></div></div> <div class="hours count-down"><div class="inner"><span class="number">%H</span><span class="string">%!H:Hour,Hours;</span></div> </div><div class="minutes count-down"><div class="inner"><span class="number">%M</span><span class="string">%!M:Minute,Minutes;</span></div> </div><div class="seconds count-down"><div class="inner"><span class="number">%S</span><span class="string">%!S:Second,Seconds;</span></div> </div>'));
    });
    /* ---------------------------------------------------------------------- */
    /*  Contact Form
     /* ---------------------------------------------------------------------- */

    var submitContact = $('#submit_contact'),
        message = $('#msg');

    submitContact.on('click', function(e) {
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: "POST",
            url: 'contact.php',
            dataType: 'json',
            cache: false,
            data: $('#contact-form').serialize(),
            success: function(data) {

                if (data.info !== 'error') {
                    $this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
                    message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                } else {
                    message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                }
            }
        });
    });
    //===============================================
    //animation
    //==============================================
    // Show element on scroll

    var $elems = $('.animate-in');
    var winheight = $(window).height();
    var fullheight = $(document).height();

    $(window).scroll(function() {
        animate_elems();
    });

    function animate_elems() {
        var wintop = $(window).scrollTop(); // calculate distance from top of window
        // loop through each item to check when it animates
        $elems.each(function() {
            var $elm = $(this);

            var topcoords = $elm.offset().top; // element's distance from top of page in pixels

            if (wintop > (topcoords - (winheight * .99999))) {
                // animate when top of the window is 3/4 above the element
                $elm.addClass('animated');

            }

        });
    } // end animate_elems()
    //============================================
    // Mobile sub menu
    //============================================
    if ($(window).width() <= 767) {
        $("#slide-nav #menu_nav ul > li.dropdown").append('<div class="more"></div>');

        $("#slide-nav #menu_nav").on("click", ".more", function(e) {
            e.stopPropagation();

            $(this).parent().toggleClass("current")
                .children("#slide-nav #menu_nav ul > li.dropdown > ul").toggleClass("open");

        });

    }

    $(window).resize(function() {
        if (window.innerWidth > 767) {
            if ($('#slide-nav #menu_nav ul > li.dropdown .more').length !== 0) {
                $('#slide-nav #menu_nav ul > li.dropdown div').remove('.more');
            }
        } else {
            $("#slide-nav #menu_nav ul > li.dropdown").append('<div class="more"></div>');
        }
    });

    var $body = $('body'),
        $wrapper = $('.body-innerwrapper'),
        $toggler = $('.navbar-toggle'),
        $close = $('.closs'),
        $offCanvas = $('.navbar-collapse');

    $toggler.on('click', function(event) {
        event.preventDefault();
        stopBubble(event);
        setTimeout(offCanvasShow, 50);
    });

    $close.on('click', function(event) {
        event.preventDefault();
        offCanvasClose();
    });

    var offCanvasShow = function() {
        $body.addClass('offcanvas');
        $wrapper.on('click', offCanvasClose);
        $close.on('click', offCanvasClose);
        $offCanvas.on('click', stopBubble);

    };

    var offCanvasClose = function() {
        $body.removeClass('offcanvas');
        $wrapper.off('click', offCanvasClose);
        $close.off('click', offCanvasClose);
        $offCanvas.off('click', stopBubble);
    };

    var stopBubble = function(e) {
        e.stopPropagation();
        return true;
    };


    jQuery(document).ready(function() {
        //===============================================
        // Skill
        //===============================================

        jQuery('.skill-inner').each(function() {
            jQuery(this).appear(function() {
                jQuery(this).find('.skill-box').animate({
                    height: jQuery(this).attr('data-percent')
                }, 1000);
            });
        });

        //========================================
        // count function
        //======================================
        jQuery('.count').each(function() {
            jQuery(this).appear(function() {
                $(this).data('count', parseInt($(this).html(), 10));
                $(this).html('0');
                count($(this));
                speed: 300 // how long it should take to count between the target numbers
            });
        });

        function count($this) {
            var current = parseInt($this.html(), 10);
            current = current + 10; /* Where 50 is increment */
            $this.html(++current);
            if (current > $this.data('count')) {
                $this.html($this.data('count'));
            } else {
                setTimeout(function() {
                    count($this)
                }, 10);
            }
        }
    }); //end of "document ready" event
})(jQuery);
