$(document).ready(function() {

    $('.main-nav-inner .sub-menu a').each(function() {
        $(this).attr('tabindex', '-1');
    });


    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        if($('.main-nav-inner').hasClass('menu-open')) {
            if($('.main-nav-inner .menu-open').hasClass('menu-open')) {
                $('.main-nav-inner .menu-open').removeClass('menu-open');
                setTimeout(function() {
                    $('.main-nav-inner').removeClass('menu-open-2');
                }, 350);
                setTimeout(function() {
                    $('.main-nav-inner').removeClass('menu-open');
                }, 400);
            } else {
                $('.main-nav-inner').removeClass('menu-open-2');
                setTimeout(function() {
                    $('.main-nav-inner').removeClass('menu-open');
                }, 50);
            }

        } else {
            $('.main-nav-inner').addClass('menu-open');
            setTimeout(function() {
                $('.main-nav-inner').addClass('menu-open-2');
            }, 350);
        }
    });



    $('.submenu-toggle').click(function() {
        if($(window).width() < getEmPixels() * 61.063) {
            if($(this).parent().hasClass('menu-open')) {
                $(this).parent().removeClass('menu-open');
                $(this).siblings('.sub-menu').find('a').attr('tabindex', '-1');
            } else {
                $(this).siblings('.sub-menu').find('a').removeAttr('tabindex');
                $(this).parent().siblings().removeClass('menu-open');
                $(this).parent().addClass('menu-open');
            }
            return false;
        }
    });
    $('.sub-menu li').click(function(event) {
        event.stopPropagation();
    });
});
