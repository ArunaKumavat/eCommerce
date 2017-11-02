$(document).ready(function() {
    var thisURL = window.location.href;
  $('.store-page-nav li').click(function() {
      var thisEQ = $(this).index();
      if($(this).siblings('.store-name').length) {
          thisEQ = thisEQ - 1;
      }
      $(this).addClass('active').siblings().removeClass('active');
      var negPercent = (100 / totalItems) * (thisEQ) * -1 + '%';
      $('.content.store-page .main-content .article-wrap>article').eq(thisEQ).addClass('active').siblings().removeClass('active');
      $('.content.store-page .main-content .article-wrap').css({
        '-webkit-transform' : 'translateX(' + negPercent + ')',
        '-ms-transform'     : 'translateX(' + negPercent + ')',
        'transform'         : 'translateX(' + negPercent + ')'
      });
      var thisSlug = $(this).html().toLowerCase();
      thisSlug = thisSlug.replace(/\s/g, "-");
      var thisURLSlug = encodeURI(thisSlug);
      history.replaceState(null, null, thisURL + '/' + thisURLSlug);
  });
    if($('.store-page-nav li').length) {
        var totalItems = $('.store-page-nav li').length;
        var totalWidth = totalItems * 100 + '%';
        var indWidth = 100 / totalItems + '%';
        $('.content.store-page .main-content .article-wrap').css('width', totalWidth);
        $('.content.store-page .main-content .article-wrap>article').css('width', indWidth);
        if($('.store-page-nav li.active').length) {
          var thisActive = $('.store-page-nav li.active').index();
          $('.store-page-nav li').eq(thisActive - 1).trigger('click');
          $('.content.store-page .main-content .article-wrap>article').eq(thisActive - 1).addClass('active').siblings().removeClass('active');
        }
    }


});

function stickyStorePageNav() {
    var scrollTop     = $(window).scrollTop(),
        elementOffset = $('.content.store-page').offset().top,
        distance      = (elementOffset - scrollTop);

    if(distance < 164) {
        $('.store-page-nav').addClass('scrolled');
    } else {
        $('.store-page-nav').removeClass('scrolled');
    }
}
if($('.store-page-nav').length) {

    enquire.register("screen and (min-width:44.063em)", {

        // OPTIONAL
        // If supplied, triggered when a media query matches.
        match : function() {
            $(window).on("scroll.scrollFix2",(function() {
                stickyStorePageNav();
            }));
        },

        // OPTIONAL
        // If supplied, triggered when the media query transitions
        // *from a matched state to an unmatched state*.
        unmatch : function() {
            $(window).off("scroll.scrollFix2");
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
}
