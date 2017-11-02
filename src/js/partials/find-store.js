$(document).ready(function() {
    $('.location-items li').click(function() {
        if($(this).hasClass('active')) {
            $(this).find('.additional-info').slideUp(350);
            $(this).removeClass('active');
        } else {
            $(this).siblings().find('.additional-info').slideUp(350);
            $(this).siblings().removeClass('active');
            var $this = $(this);
            var extraHeight = 0;
            if($('.find-store-intro').length) {
              extraHeight = $('.find-store-intro').outerHeight();
            }
            $(this).find('.additional-info').slideDown(350, function() {
              $('.location-items').animate({
                 scrollTop: $this.offset().top - $this.parent().offset().top - $this.parent().scrollTop() + extraHeight
              }, 350);

            });
            $(this).addClass('active');

            var thisIndex = $(this).index();
            google.maps.event.trigger(markersObject[thisIndex], 'click');

        }
    });

    $('.location-items li').on('pinChanged', function() {
        if($(this).hasClass('active')) {

        } else {
          $(this).siblings().find('.additional-info').slideUp(350);
          $(this).siblings().removeClass('active');
          var $this = $(this);
          var extraHeight = 0;
          if($('.find-store-intro').length) {
            extraHeight = $('.find-store-intro').outerHeight();
          }
          $(this).find('.additional-info').slideDown(350, function() {
            $('.location-items').animate({
               scrollTop: $this.offset().top - $this.parent().offset().top - $this.parent().scrollTop() + extraHeight
            }, 350);

          });
          $(this).addClass('active');

        }
    });


    if(getCookie('yokohama_selected_store')) {
      
	   $.ajax({
			url: "/webapi/storelocations/getSelectedStoreLocation",
			type: "GET",
			contentType: 'application/json; charset=utf-8',
			success: function (storeLocation) {				
				$('.page-header .header-store-details .store-location a').html(storeLocation);
			}
		});  
    }
});
