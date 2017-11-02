$(document).ready(function() {
    function trim_words(theString, numWords) {
        expString = theString.split(/\s+/,numWords);
        theNewString=expString.join(" ");
        return theNewString;
    }
    if($('.tyre-info').length) {
        var initReadMoreString = $('.tyre-info').html();
    } else {
        var initReadMoreString = '';
    }

    if(initReadMoreString.length > 75) {
        var newReadMoreString = trim_words(initReadMoreString, 25) + '...' + '<span class="read-more">More</span>';
        $('.tyre-info').html(newReadMoreString);



        $('.tyre-info').on("click", ".read-more", function() {
            var thisParent = $(this).parent();
            if(thisParent.hasClass('active')) {
                thisParent.removeClass('active');
                $('.tyre-info').html(newReadMoreString)
                $(this).html('More');
            } else {
                thisParent.addClass('active');
                $('.tyre-info').html(initReadMoreString);
                $('.tyre-info .read-more').html('Less');
            }
        });
    }
});
