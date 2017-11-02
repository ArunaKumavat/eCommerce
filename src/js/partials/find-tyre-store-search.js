$(document).ready(function() {
    var findTyreStoreBtnText = $('.find-tyre-store').html();
    $('.find-tyre-store').click(function() {
        if($(this).hasClass('close-button')) {
            $(this).html(findTyreStoreBtnText);
            $(this).removeClass('close-button');
            $('.find-store-menu-bar').slideUp(350);
            $('.dark-overlay').css('opacity', 0);
            setTimeout(function() {
                $('body').removeClass('slide-menu-open');
            }, 10);
            setTimeout(function() {
                $('.dark-overlay').remove();
            }, 250);
        } else { 
            $(this).html('Close Search');
            $(this).addClass('close-button');
            $('.modal').fadeOut(250);

            if($('body').hasClass('slide-menu-open')) {
                setTimeout(function() {
                    $('.find-store-menu-bar').slideDown(350);
                }, 350);
            } else {
                $('.find-store-menu-bar').slideDown(350);
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
    $('.store-nav-item').click(function(event) {
        if($('.find-tyre-store').hasClass('close-button')) {
            $('.find-tyre-store').removeClass('close-button');
            $('.find-tyres-menu-bar').slideUp(350);
        }

    });
    $('.store-nav-item').click(function(event) {
        event.preventDefault();
        $('.find-tyre-store').trigger('click');
    });
    $('.find-store-menu-bar .close-dropdown').click(function() {
        $('.find-tyre-store').trigger('click');
    });
    $('.change-store').click(function(event) {
        $('.find-tyre-store').trigger('click');
    });
});
