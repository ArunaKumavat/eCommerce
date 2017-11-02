$(document).ready(function() {
    var refineSearchText = $('.refine-search').html();
    var findTyresText = $('.find-tyres').html();
    $('.tyres-nav-item').click(function(event) {
        event.preventDefault();
        if($(this).hasClass('close-button')) {
            $(this).removeClass('close-button');
            $('.refine-search').removeClass('close-button').html(refineSearchText);
            $('.find-tyres').removeClass('close-button').html(findTyresText);
            $('.find-tyres-menu-bar').slideUp(350);
            $('.dark-overlay').css('opacity', 0);
            setTimeout(function() {
                $('body').removeClass('slide-menu-open');
            }, 10);
            setTimeout(function() {
                $('.dark-overlay').remove();
            }, 250);
        } else {
            $(this).addClass('close-button');
            $('.refine-search').addClass('close-button').html('Close Search');
            $('.find-tyres').addClass('close-button').html('Close Search');
            $('.modal').fadeOut(250);
            if($('.find-tyre-store').hasClass('close-button')) {
                $('.find-tyre-store').removeClass('close-button').html('Find Tyre Store');
                $('.find-store-menu-bar').slideUp(350);
            }
            if($('body').hasClass('slide-menu-open')) {
                setTimeout(function() {
                    $('.find-tyres-menu-bar').slideDown(350);
                }, 350);
            } else {
                $('.find-tyres-menu-bar').slideDown(350);
            }
            if($('.dark-overlay').length) {

            } else {
                $('body').append('<div class="dark-overlay"></div>');
            }
            setTimeout(function() {
                $('.dark-overlay').css('opacity', 1);
                $('body').addClass('slide-menu-open');
            }, 10);
        }
    });
    $('.find-tyre-store').click(function(event) {
        if($('.tyres-nav-item').hasClass('close-button')) {
            $('.tyres-nav-item').removeClass('close-button');
            $('.refine-search').removeClass('close-button').html(refineSearchText);
            $('.find-tyres').removeClass('close-button').html(findTyresText);
            $('.find-tyres-menu-bar').slideUp(350);
        }
    });
    $('.find-tyres-menu-bar .close-dropdown').click(function( event ) {
        event.stopPropagation();
        $('.tyres-nav-item').trigger('click');
    });
    $('.refine-search, .find-tyres').click(function() {
        $('.tyres-nav-item').trigger('click');
    });
    $('.change-store').click(function(event) {
        if($('.tyres-nav-item').hasClass('close-button')) {
            $('.tyres-nav-item').removeClass('close-button');
            $('.refine-search').removeClass('close-button').html(refineSearchText);
            $('.find-tyres').removeClass('close-button').html(findTyresText);
            $('.find-tyres-menu-bar').slideUp(350);
        }
    });

    $('.find-tyres-menu-bar .logo-matrix > a').click(function(event) {
        event.preventDefault();
        $(this).parent().prepend(this);
        var brand = $(this).attr('data-brand');
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().siblings('.tyre-search-vehicles-form').find('#vehicle-make option:contains("' + brand  + '")').prop('selected', true).trigger('change');
        $('.tyre-search-vehicles-form').addClass('active');
    });
    $('.find-tyres-menu-bar .close-expansion').click(function() {
        $('.tyre-search-vehicles-form').removeClass('active');
    });

});
