$(document).ready(function() {



    function checkTyreSizeInputs(selectItem) {
      var $this = selectItem;
      var formFalse = false;
      if($this.find('option:selected').index() < 1) {
        formFalse = true;
      } else {
        $this.parent().siblings('label').each(function() {
          if($(this).find('option:selected').index() < 1) {
            formFalse = true;
          }
        });
      }

      if(formFalse) {
        $this.parent().siblings('button.btn').prop('disabled', true);
      } else {
        $this.parent().siblings('button.btn').prop('disabled', false);
      }
    }



    $('.tyre-search-widget .title').click(function() {
        $(this).parent().removeClass('active').siblings().removeClass('active');
        var thisClass = $(this).parent().attr('class');
        document.cookie = 'refineSelected=' + thisClass + '; max-age=' + 60 * 60 * 24 * 7 + '; path=/';
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
    });

    if(getCookie('refineSelected')) {
        currentRefineSelected = getCookie('refineSelected');
        $('.' + currentRefineSelected + ' .title').trigger('click');
    }


    $('select[id=section-width]').change(function() {
        $('select[id=section-width]').not(this).val($(this).val());
        checkTyreSizeInputs($(this));
    });
    $('select[id=aspect-ratio]').change(function() {
        $('select[id=aspect-ratio]').not(this).val($(this).val());
        checkTyreSizeInputs($(this));
    });
    $('select[id=rim-diameter]').change(function() {
        $('select[id=rim-diameter]').not(this).val($(this).val());
        checkTyreSizeInputs($(this));
    });


    var accessToken = localStorage.getItem("accessToken");
    var accessTokenExpiry = localStorage.getItem("accessToken_expiresIn");
    if (accessTokenExpiry < Date.now()) {
        accessToken = null;
    }



    if(accessToken === null) {
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.vehiclelogic.com.au/token",
          "method": "POST",
          "headers": {
            "cache-control": "no-cache",
            "postman-token": "31db7ead-ca0d-826f-9d48-68d2a181c844",
            "content-type": "application/x-www-form-urlencoded"
          },
          "data": {
            "grant_type": "password",
            "username": "tymore1!tyres?",
            "password": "t1tyrmo1?"
          }
        }

        $.ajax(settings).done(function (response) {
          accessToken = response.access_token;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("accessToken_expiresIn", Date.now() + (60*60*1000*10)); // 10 hours
        });
    }

    function vehicleModelMake(response) {
        $('.tyre-search-vehicles-form').removeClass('loading');
        $("select[id=vehicle-model]").each(function() {
            $(this).prop('disabled', false);
        });
        $.each( response.Items, function( key, item ) {
            $('select[id=vehicle-model]').each(function() {
               $(this).append(
                   $("<option></option>").val(item.Id).html(item.Name).attr('data-years', JSON.stringify(item.YearRanges))
               );
            });
        });
    }
    function vehicleSeriesMake(response) {
        $('.tyre-search-vehicles-form').removeClass('loading');
        $("select[id=vehicle-series]").prop('disabled', false);
        $.each( response.Items, function( key, item ) {
            $('select[id=vehicle-series]').append(
                $("<option></option>").val(item.Id).html(item.Name)
            );
        });
    }


    $('select[id=vehicle-make]').change(function() {
        $('select[id=vehicle-make]').not(this).val($(this).val());
        if($('.logo-matrix .active').attr('data-brand') === $(this).find("option:selected" ).html()) {

        } else {
            $('.logo-matrix .active').removeClass('active');
            $('.logo-matrix a[data-brand="' + $(this).find("option:selected" ).html() +'"]').addClass('active');
            $('.logo-matrix').prepend($('.logo-matrix .active'));
        }
        $('.tyre-search-vehicles-form').addClass('loading');
        $('.tyre-search-vehicles-form button.btn').prop('disabled', true);
        $("select[id=vehicle-model]").each(function() {
            $(this).find('option').not(':first').remove();
            $(this).find('option').eq(0).prop('selected', true)
            $(this).prop('disabled', true);
        });
        $("select[id=vehicle-year]").each(function() {
            $(this).find('option').not(':first').remove();
            $(this).find('option').eq(0).prop('selected', true)
            $(this).prop('disabled', true);
        });
        $("select[id=vehicle-series]").each(function() {
            $(this).find('option').not(':first').remove();
            $(this).find('option').eq(0).prop('selected', true)
            $(this).prop('disabled', true);
        });
        var chosenVehicleID = $( this ).find("option:selected" ).val();
        var locallyStoredModels = localStorage.getItem("vehicleID" + chosenVehicleID + "Models");
        var locallyStoredModelsExpiry = localStorage.getItem("vehicleID" + chosenVehicleID + "Models_expiresIn");
        if(locallyStoredModelsExpiry < Date.now()) {
            locallyStoredModels = null;
        }

        if(locallyStoredModels === null) {
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://api.vehiclelogic.com.au:443/vehicles/models?vehiclemakeids=" + chosenVehicleID,
              "method": "GET",
              "headers": {
                "cache-control": "no-cache",
                "postman-token": "c9f9ff6c-7ff8-12d5-78bb-07888da789d4",
                "Authorization": "Bearer " + accessToken
              }
            }

            $.ajax(settings).done(function (response) {
              vehicleModelMake(response);
              localStorage.setItem("vehicleID" + chosenVehicleID + "Models", JSON.stringify(response));
              localStorage.setItem("vehicleID" + chosenVehicleID + "Models_expiresIn", Date.now() + (60*60*1000*20)); // 20 hour
            });
        } else {
            var response = JSON.parse(localStorage.getItem("vehicleID" + chosenVehicleID + "Models"));
            vehicleModelMake(response);
        }

    });

    $('select[id=vehicle-model]').change(function() {
        $('select[id=vehicle-model]').not(this).val($(this).val());
        $("select[id=vehicle-year]").each(function() {
            $(this).find('option').not(':first').remove();
            $(this).find('option').eq(0).prop('selected', true);
            $(this).prop('disabled', false);
        });
        $("select[id=vehicle-series]").each(function() {
            $(this).find("option").not(':first').remove();
            $(this).find('option').eq(0).prop('selected', true)
            $(this).prop('disabled', true);
        });

        $('.tyre-search-vehicles-form button.btn').prop('disabled', true);

        var chosenVehicleYears = JSON.parse($( this ).find("option:selected" ).attr('data-years'));

        for(index = 0; index < chosenVehicleYears.length; ++index) {
            var chosenStartYear = chosenVehicleYears[index].Start;
            var chosenEndYear = chosenVehicleYears[index].End;
            while (chosenStartYear <= chosenEndYear) {
                $('select[id=vehicle-year]').append(
                    $("<option></option>").val(chosenStartYear).html(chosenStartYear)
                );
                chosenStartYear++;
            }
        }
    });

    $('select[id=vehicle-year]').change(function() {
        $('select[id=vehicle-year]').not(this).val($(this).val());
        $('.tyre-search-vehicles-form').addClass('loading');
        $("select[id=vehicle-series]").each(function() {
            $(this).find("option").not(':first').remove();
        });
        var chosenModelID = $(this).parent().parent().find( "#vehicle-model option:selected" ).val();
        var chosenYear = $(this).parent().parent().find( "#vehicle-year option:selected" ).val();

        var locallyStoredSeries = localStorage.getItem("modelID" + chosenModelID + "chosenYear" + chosenYear + "Series");
        var locallyStoredSeriesExpiry = localStorage.getItem("modelID" + chosenModelID + "chosenYear" + chosenYear + "Series_expiresIn");
        if(locallyStoredSeriesExpiry < Date.now()) {
            locallyStoredSeries = null;
        }


        if(locallyStoredSeries === null) {
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://api.vehiclelogic.com.au:443/vehicles/vehicles?modelid=" + chosenModelID + "&year=" + chosenYear,
              "method": "GET",
              "headers": {
                "cache-control": "no-cache",
                "postman-token": "c9f9ff6c-7ff8-12d5-78bb-07888da789d4",
                "Authorization": "Bearer " + accessToken
              }
            }

            $.ajax(settings).done(function (response) {
              vehicleSeriesMake(response);

              localStorage.setItem("modelID" + chosenModelID + "chosenYear" + chosenYear + "Series", JSON.stringify(response));
              localStorage.setItem("modelID" + chosenModelID + "chosenYear" + chosenYear + "Series_expiresIn", Date.now() + (60*60*1000*20)); // 20 hour
            });
        } else {
            var response = JSON.parse(localStorage.getItem("modelID" + chosenModelID + "chosenYear" + chosenYear + "Series"));
            vehicleSeriesMake(response);
        }
    });

    $('select[id=vehicle-series]').change(function() {
        $('select[id=vehicle-series]').not(this).val($(this).val());
        $('.tyre-search-vehicles-form button.btn').prop('disabled', false);
    });

    $("select[id=vehicle-make]").each(function () {
        if($(this).prop('selectedIndex') > 0) {
            $(this).change();
        }
    });


    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }
    var urlMake;
    var urlModel;
    var urlYear;
    var urlSeries;

    if(getURLParameter('make')) {
        urlMake = getURLParameter('make');
        $('#vehicle-make').val(urlMake).change();
        if(getURLParameter('model')) {
            urlModel = getURLParameter('model');

            $('#vehicle-model').val(urlModel).change();
            if($('.tyre-details h1, .tyre-results h1').length) {
                var prevTitle = $('.tyre-details h1, .tyre-results h1').html();
                var replaceWith = $('#vehicle-model').find('option:selected').html();
                if($('.tyre-details .tyre-highlight .tyre-title').length) {
                  replaceWith = replaceWith + ' ' + $('.tyre-details .tyre-highlight .tyre-title').html();
                }
                var newTitle = prevTitle.replace('model-name', replaceWith);
                $('.tyre-details h1, .tyre-results h1').html(newTitle);
            }
            if(getURLParameter('year')) {
                urlYear = getURLParameter('year');
                $('#vehicle-year').val(urlYear).change();
                if(getURLParameter('series')) {
                    urlSeries = getURLParameter('series');
                    $('#vehicle-series').val(urlSeries).change();
                }
            }
        }
    } else if(getCookie('yokohama_make')) {
        urlMake = getCookie('yokohama_make');
        $('#vehicle-make').val(urlMake).change();
        if(getCookie('yokohama_model')) {
            urlModel = getCookie('yokohama_model');

            $('#vehicle-model').val(urlModel).change();
            if($('.tyre-details h1, .tyre-results h1').length) {
                var prevTitle = $('.tyre-details h1, .tyre-results h1').html();
                var replaceWith = $('#vehicle-model').find('option:selected').html();
                if($('.tyre-details .tyre-highlight .tyre-title').length) {
                  replaceWith = replaceWith + ' ' + $('.tyre-details .tyre-highlight .tyre-title').html();
                }
                var newTitle = prevTitle.replace('model-name', replaceWith);

                $('.tyre-details h1, .tyre-results h1').html(newTitle);
            }

            if(getCookie('yokohama_year')) {
                urlYear = getCookie('yokohama_year');
                $('#vehicle-year').val(urlYear).change();
                if(getCookie('yokohama_series')) {
                    urlSeries = getCookie('yokohama_series');
                    $('#vehicle-series').val(urlSeries).change();
                }
            }
        }
    }



    var sectionWidth;
    var aspectRatio;
    var rimDiameter;

    if(getURLParameter('sectionWidth')) {
        sectionWidth = getURLParameter('sectionWidth');
        $('#section-width').val(sectionWidth).change();
    } else if(getCookie('yokohama_width')) {
        sectionWidth = getCookie('yokohama_width');
        $('#section-width').val(sectionWidth).change();
    }

    if(getURLParameter('aspectRatio')) {
        aspectRatio = getURLParameter('aspectRatio');
        $('#aspect-ratio').val(aspectRatio).change();

    } else if(getCookie('yokohama_ratio')) {
        aspectRatio = getCookie('yokohama_ratio');
        $('#aspect-ratio').val(aspectRatio).change();
    }

    if(getURLParameter('rimDiameter')) {
        rimDiameter = getURLParameter('rimDiameter');
        $('#rim-diameter').val(rimDiameter).change();

    } else if(getCookie('yokohama_diameter')) {
        rimDiameter = getCookie('yokohama_diameter');
        $('#rim-diameter').val(rimDiameter).change();
    }






});

$(window).load(function() {

$('.tyre-search-vehicles-form, .tyre-search-size-form').each(function() {
  var formFalse = false;

  $(this).find('select').each(function() {
    if($(this).find('option:selected').index() < 1) {
      formFalse = true;
    }
  });

  if(formFalse) {
    $(this).find('button.btn').prop('disabled', true);
  }

});



});
