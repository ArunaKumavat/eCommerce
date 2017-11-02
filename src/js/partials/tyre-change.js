$(document).ready(function() {

    function changeTyreData(width, ratio, diameter, load, speed, construction, sidewall, price, cataloguePrice) {
        $('.tyre-details .sub-section-list td').each(function() {
            if($(this).html() === 'Width') {
                $(this).next().html(width);
            } else if($(this).html() === 'Ratio') {
                $(this).next().html(ratio);
            } else if($(this).html() === 'Diameter') {
                $(this).next().html(diameter);
            } else if($(this).html() === 'Load') {
                $(this).next().html(load);
            } else if($(this).html() === 'Speed') {
                $(this).next().html(speed);
            } else if($(this).html() === 'Construction') {
                $(this).next().html(construction);
            } else if($(this).html() === 'Sidewall') {
                $(this).next().html(sidewall);
            }
        });
        if(price == "0") {
          $('.tyre-price').html(cataloguePrice).addClass('catalogue-special');
        } else if(cataloguePrice == "0") {
          $('.tyre-price').html(price).removeClass('catalogue-special');
        }

    }

    function processAjaxData(response, urlPath) {
         window.history.pushState({"Code":response.Code,"urlPiece":response.urlCode,"Price":response.Price,"CataloguePrice":response.CataloguePrice,"Specifications":response.Specifications},"", urlPath);
         changeTyreData(response.Specifications.SectionWidth, response.Specifications.AspectRatio, response.Specifications.RimDiameter, response.Specifications.LoadIndex, response.Specifications.SpeedRating,
         response.Specifications.Construction,
         response.Specifications.Sidewall,
         response.Price, response.CataloguePrice);

         if($('.tyre-change + .btn-order').length) {
           $('.tyre-change + .btn-order').val(response.Code);
         }

     }


     window.onpopstate = function(e){
        if(e.state){
            changeTyreData(e.state.Specifications.SectionWidth, e.state.Specifications.AspectRatio, e.state.Specifications.RimDiameter, e.state.Specifications.LoadIndex, e.state.Specifications.SpeedRating,
            e.state.Specifications.Construction,
            e.state.Specifications.Sidewall,
            e.state.Price, e.state.CataloguePrice);

            $('.tyre-change-select option[value*="' +  e.state.urlPiece +  '"]').prop('selected', true);
            console.log(e.state.urlPiece);
        }
    };

    var initURL = window.location.pathname;
    if(initURL) {
        var initURLExplode = initURL.split("/");
        var initURLValue = initURLExplode[initURLExplode.length - 1];
    }


    $('.tyre-change-select option[value*="' +  initURLValue +  '"]').prop('selected', true);

    $('.tyre-change-select').change(function() {

        var chosenTyreSize = $( this ).find("option:selected" ).html();
        var chosenTyreSizeAPI = $( this ).find("option:selected" ).val();
        var currentTyreTitle = encodeURIComponent($('.tyre-title').html());
        var locallyStoredTyreSize = localStorage.getItem(currentTyreTitle + "Size" + chosenTyreSize);
        var locallyStoredTyreSizeExpiry = localStorage.getItem(currentTyreTitle + "Size" + chosenTyreSize +"_expiresIn");

        var currentURL = window.location.pathname;
        var currentURLExplode = currentURL.split("/");
        var newURL = "/" + currentURLExplode[1] + "/" + currentURLExplode[2] + "/" + currentURLExplode[3] + "/" + chosenTyreSizeAPI;

        if(locallyStoredTyreSizeExpiry < Date.now()) {
            locallyStoredTyreSize = null;
        }

        if(locallyStoredTyreSize === null) {
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "/webapi/tyredetails/getSizeDetails/" + chosenTyreSizeAPI,
              "method": "GET",
              "headers": {
                "cache-control": "no-cache"
              }
            }

            $.ajax(settings).done(function (response) {
              response.urlCode = chosenTyreSizeAPI;


              processAjaxData(response, newURL);
              localStorage.setItem(currentTyreTitle + "Size" + chosenTyreSize, JSON.stringify(response));
              localStorage.setItem(currentTyreTitle + "Size" + chosenTyreSize +"_expiresIn", Date.now() + (60*60*1000*20)); // 20 hour
            });
        } else {
            var response = JSON.parse(localStorage.getItem(currentTyreTitle + "Size" + chosenTyreSize));

            response.urlCode = chosenTyreSizeAPI;

            processAjaxData(response, newURL);
        }

    });
});
