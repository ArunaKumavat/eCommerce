$(document).ready(function() {
    var make_list_number = $(".content.vehicle-make-list .logo-matrix > a").size();
    var moreOrAll = 'all';
    if($('.content.vehicle-make-list .show-more').length) {
        moreOrAll = 'more';
    } else if($('.content.vehicle-make-list .show-all').length) {
        moreOrAll = 'all';
    }
    $('.content.vehicle-make-list .logo-matrix > a').hide();
    var makeListInitShow = 20;

    $('.content.vehicle-make-list .logo-matrix > a:lt('+makeListInitShow+')').show();
    if(make_list_number < makeListInitShow) {
        $('.content.vehicle-make-list .show-'+ moreOrAll).hide();
    }

    $('.content.vehicle-make-list .show-'+ moreOrAll).click(function() {
        makeListInitShow = (makeListInitShow+20 <= make_list_number) ? makeListInitShow+20 : make_list_number;

        $('.content.vehicle-make-list .logo-matrix > a:lt('+makeListInitShow+')').show();
        if(make_list_number == makeListInitShow) {
            $('.content.vehicle-make-list .show-' + moreOrAll).hide();
        }
    });
});
