$(document).ready(function() {

    $('.tooltip').hover(function() {
        $(this).find('.tooltip-message').toggle();
    });

    if ( $('[type="date"]').prop('type') != 'date' ) {
        $('[type="date"]').attr('placeholder', 'dd/mm/yyyy');
    }
});
