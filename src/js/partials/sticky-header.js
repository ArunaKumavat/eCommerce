function stickyHeader() {
    var scrollTop = $(window).scrollTop();
    if(scrollTop > 90) {
        $('body').addClass('body-scrolled');
        $('.page-header').addClass('scrolled');
        $('body').css('paddingTop', $('.page-header').height() + 110);
    } else {
        $('body').removeClass('body-scrolled');
        $('.page-header').removeClass('scrolled');
        $('body').css('paddingTop', $('.page-header').height());
    }
}

enquire.register("screen and (min-width:44.063em)", {

    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
        $('body').css('paddingTop', $('.page-header').height());
        $(window).on("scroll.scrollFix",(function() {
            stickyHeader();
        }));
        $(window).on("resize.scrollFix",(function() {
            stickyHeader();
            setTimeout(function() {
                $(window).trigger('resize');
            }, 100);
        }));
        setTimeout(function() {
            $(window).trigger('resize');
        }, 100);
    },

    // OPTIONAL
    // If supplied, triggered when the media query transitions
    // *from a matched state to an unmatched state*.
    unmatch : function() {
        $('body').css('paddingTop', 0);
        $('body').removeClass('body-scrolled');
        $('.page-header').removeClass('scrolled');
        $(window).off("scroll.scrollFix");
        $(window).off("resize.scrollFix");
    },

    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {

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
