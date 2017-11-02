$(document).ready(function() {
    $('.request-a-quote').click(function() {
        $('.request-a-quote-form').fadeIn(250);
        $('body').append('<div class="dark-overlay"></div>');

        if($('.tyre-change-select').length) {
          var thisSelected = $('.tyre-change-select option:selected').val();
          $('input[name=TyreDetails]').val(thisSelected);
        }

        setTimeout(function() {
            $('.dark-overlay').css('opacity', 1);
            $('.dark-overlay').addClass('zindexshift');
        }, 10);
    });
    $('body').on('click', '.dark-overlay', function() {
        $('.request-a-quote-form').fadeOut(250);
        $('.dark-overlay').css('opacity', 0);
        setTimeout(function() {
            $('.dark-overlay').remove();
        }, 250);
        if($('.find-tyre-store').hasClass('close-button')) {
            $('.find-tyre-store').trigger('click');
        };
        if($('.store-nav-item').hasClass('close-button')) {
            $('.store-nav-item').trigger('click');
        };
        if($('.tyres-nav-item').hasClass('close-button')) {
            $('.tyres-nav-item').trigger('click');
        };

    });
});
