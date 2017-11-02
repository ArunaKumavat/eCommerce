enquire.register("screen and (min-width:61.063em)", {

    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
        if($('.news-preview-list-flexslider').length) {
            var flex = $('.news-preview-list-flexslider').data('flexslider').destroy(); //detach
            $('.news-preview-list-flexslider').append(flex); //reattach
        }
    },

    // OPTIONAL
    // If supplied, triggered when the media query transitions
    // *from a matched state to an unmatched state*.
    unmatch : function() {
        $('.news-preview-list-flexslider').flexslider({
            animation: "slide",
            controlNav: false,
            start: function() {
                $('.news-preview-list-flexslider').data('flexslider').resize();
            },
            nextText: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.37px" height="20.74px" viewBox="0 0 11.37 20.74" style="enable-background:new 0 0 11.37 20.74;" xml:space="preserve"><polyline class="st0" points="1,1 10.37,10.37 1,19.74 "/></svg>',
            prevText: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.37px" height="20.74px" viewBox="-299 386.26 11.37 20.74" style="enable-background:new -299 386.26 11.37 20.74;" xml:space="preserve"><polyline class="st0" points="-288.63,406 -298,396.63 -288.63,387.26 "/></svg>'
        });
    },

    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {
        $('.news-preview-list-flexslider').flexslider({
            animation: "slide",
            controlNav: false,
            start: function() {
                $('.news-preview-list-flexslider').data('flexslider').resize();
            },
            nextText: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.37px" height="20.74px" viewBox="0 0 11.37 20.74" style="enable-background:new 0 0 11.37 20.74;" xml:space="preserve"><polyline class="st0" points="1,1 10.37,10.37 1,19.74 "/></svg>',
            prevText: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.37px" height="20.74px" viewBox="-299 386.26 11.37 20.74" style="enable-background:new -299 386.26 11.37 20.74;" xml:space="preserve"><polyline class="st0" points="-288.63,406 -298,396.63 -288.63,387.26 "/></svg>'
        });
    },

    // OPTIONAL, defaults to false
    // If set to true, defers execution of the setup function
    // until the first time the media query is matched
    deferSetup : false,

    // OPTIONAL
    // If supplied, triggered when handler is unregistered.
    // Place cleanup code here
    destroy : function() {}

});
