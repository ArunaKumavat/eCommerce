
(function(){
    eCommerceApp.Router = Backbone.Router.extend ({

        routes: {
            "confirm": "confirm",  //#confirm
            "cart": "cart",  //#cart
            "thankyou": "thankyou"
        },

        initialize: function(){
            var header =  new eCommerceApp.Header();
            header.render();
        },

        confirm: function () {
           var appView =  new eCommerceApp.AppConfirm();
            $("html, body").animate({ scrollTop: 100 }, "slow");
            $('#modal').html(appView.render());
        },

        cart: function () {
            var appCart = new eCommerceApp.AppCart();
            $("html, body").animate({ scrollTop: 100 }, "slow");
            $('#modal').html(appCart.render());
        },

        thankyou: function(){
            var appThankYou  = new eCommerceApp.AppThankYou();
            $('#modal').html(appThankYou.render());
        }
    });
})();
