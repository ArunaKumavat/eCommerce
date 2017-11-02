$(window).load(function() {
    if(typeof window.flexsliderSpeed === undefined) {
        window.flexsliderSpeed = 7000;
    }
    $('.hero-banner-flexslider').flexslider({
        animation: "slide",
        start: function(slider) {
            $('.hero-banner-flexslider').data('flexslider').resize();
        },
        //nextText: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.37px" height="20.74px" viewBox="0 0 11.37 20.74" style="enable-background:new 0 0 11.37 20.74;" xml:space="preserve"><polyline class="st0" points="1,1 10.37,10.37 1,19.74 "/></svg>',
        //prevText: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.37px" height="20.74px" viewBox="-299 386.26 11.37 20.74" style="enable-background:new -299 386.26 11.37 20.74;" xml:space="preserve"><polyline class="st0" points="-288.63,406 -298,396.63 -288.63,387.26 "/></svg>'
        nextText: '',
        prevText: '',
        directionNav: false,
        slideshowSpeed: window.flexsliderSpeed

    });
});
