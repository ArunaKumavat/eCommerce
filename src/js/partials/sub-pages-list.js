$(document).ready(function() {
    $('.sub-pages-list li').click(function() {
        if($(window).width() < getEmPixels() * 61.063) {
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
    $('.sub-pages-list .item-content').click(function(event) {
        event.stopPropagation(); 
    });
});
