var eCommerceApp = eCommerceApp || {};
eCommerceApp.itemView = null;
(function() {
    $( document ).ready(function() {
        eCommerceApp.Router = new eCommerceApp.Router();
        Backbone.history.start();

        $('.btn-order').click(function(){
            eCommerceApp.Router.navigate("#confirm",{trigger: true});
            $("html, body").animate({ scrollTop: 100 }, "slow");
            eCommerceApp.itemView = $(this).attr("value");
            CartModel.getItemDetails(eCommerceApp.itemView);
        });
    });
})();



