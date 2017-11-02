$(document).ready(function() {
    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }

    var urlMake
    var urlModel;


    if(getURLParameter('make')) {
        urlMake = getURLParameter('make');
        var response = JSON.parse(localStorage.getItem("vehicleID" + urlMake + "Models"));
        console.log(response);
        if(response) {
            if(getURLParameter('model')) {
                urlModel = parseInt(getURLParameter('model'));
                var modelName;
                $.each( response.Items, function( key, item ) {
                    if(item.Id === urlModel) {
                        modelName = item.Name;
                    }
                });
                $('.tyre-results h1 .model-placeholder').html(modelName);
            }
        }
    }

    var tyre_results_number = $(".tyre-items-wrap > div").size();
    $('.tyre-items-wrap > div').hide();
    if($(window).width() > getEmPixels() * 61.063) {
        var initShow = 10;
        $('.tyre-items-wrap > div:lt('+initShow+')').show();
        if(tyre_results_number < initShow) {
            $('.tyre-results .show-all, .tyre-results .load-more').hide();
        }
    } else if($(window).width() <= getEmPixels() * 61.063 && $(window).width() > getEmPixels() * 44.063) {
        var initShow = 8;
        $('.tyre-items-wrap > div:lt('+initShow+')').show();
        if(tyre_results_number < initShow) {
            $('.tyre-results .show-all, .tyre-results .load-more').hide();
        }
    } else {
        var initShow = 6;
        $('.tyre-items-wrap > div:lt('+initShow+')').show();
        if(tyre_results_number < initShow) {
            $('.tyre-results .show-all, .tyre-results .load-more').hide();
        }
    }

    $('.tyre-results .load-more').click(function() {
        if($(window).width() > getEmPixels() * 61.063) {
            initShow = (initShow+10 <= tyre_results_number) ? initShow+10 : tyre_results_number;
            $('.tyre-items-wrap > div:lt('+initShow+')').show();
            if(tyre_results_number == initShow) {
                $('.tyre-results .show-all, .tyre-results .load-more').hide();
            }
        } else if($(window).width() <= getEmPixels() * 61.063 && $(window).width() > getEmPixels() * 44.063) {
            initShow = (initShow+8 <= tyre_results_number) ? initShow+8 : tyre_results_number;
            $('.tyre-items-wrap > div:lt('+initShow+')').show();
            if(tyre_results_number == initShow) {
                $('.tyre-results .show-all, .tyre-results .load-more').hide();
            }
        } else {
            initShow = (initShow+6 <= tyre_results_number) ? initShow+6 : tyre_results_number;
            $('.tyre-items-wrap > div:lt('+initShow+')').show();
            if(tyre_results_number == initShow) {
                $('.tyre-results .show-all, .tyre-results .load-more').hide();
            }
        }
    });

    $('.tyre-results .show-all').click(function() {
        $('.tyre-items-wrap > div').show();
        $('.tyre-results .show-all, .tyre-results .load-more').hide();
    });



});
