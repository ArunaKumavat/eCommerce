$(document).ready(function() {
    $('.sub-section-list li').click(function() {
        if($(window).width() < getEmPixels() * 44.063) {
            if($(this).hasClass('active')) {
                $(this).find('.item-content').slideUp(350);
                $(this).removeClass('active');
            } else {
                $(this).siblings().find('.item-content').slideUp(350);
                $(this).siblings().removeClass('active');

                $(this).find('.item-content').slideDown(350);
                $(this).addClass('active');
            }

            return false;
        }
    });
});
